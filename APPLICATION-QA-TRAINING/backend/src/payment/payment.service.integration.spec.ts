import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import request from 'supertest';
import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';

// Test D'INTÉGRATION HTTP : on démarre une vraie application Nest (mêmes
// modules, guards et pipes qu'en prod) et on lui envoie de vraies requêtes
// HTTP avec supertest, contre une vraie base SQLite (fichier temporaire dédié
// aux tests). L'objectif précis ici : vérifier que le total du panier,
// calculé à partir des CartItem, est bien celui qui est écrit en base dans
// Booking.totalPrice au moment du paiement — pas seulement renvoyé dans la
// réponse HTTP.

const BACKEND_ROOT = path.join(__dirname, '../..');
const TEST_DB_PATH = path.join(BACKEND_ROOT, 'prisma', 'test-payment.db');
const TEST_DATABASE_URL = `file:${TEST_DB_PATH}`;

describe('PaymentController - intégration HTTP (total du panier persisté en base)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwtService: JwtService;
  let userId: number;
  let flightId: number;
  let hotelId: number;
  let authHeader: string;

  beforeAll(async () => {
    process.env.DATABASE_URL = TEST_DATABASE_URL;
    if (fs.existsSync(TEST_DB_PATH)) fs.unlinkSync(TEST_DB_PATH);

    // Crée le schéma dans la base de test à partir du schema.prisma existant,
    // sans toucher à la base de dev (dev.db) ni à celle du test panier.
    execSync('npx prisma db push --skip-generate --accept-data-loss', {
      cwd: BACKEND_ROOT,
      env: { ...process.env, DATABASE_URL: TEST_DATABASE_URL },
      stdio: 'pipe',
    });

    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();

    app = moduleRef.createNestApplication();
    // Mêmes réglages que main.ts, pour que le test exerce le même comportement qu'en prod.
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: false }));
    await app.init();

    prisma = moduleRef.get(PrismaService);
    jwtService = moduleRef.get(JwtService);
  });

  afterAll(async () => {
    await app.close();
    if (fs.existsSync(TEST_DB_PATH)) fs.unlinkSync(TEST_DB_PATH);
  });

  beforeEach(async () => {
    const destination = await prisma.destination.create({
      data: {
        slug: 'paris-test',
        city: 'Paris',
        country: 'France',
        imageUrl: 'paris.jpg',
        description: 'Destination de test',
      },
    });

    const user = await prisma.user.create({
      data: { email: `test-${Date.now()}@voyago.dev`, passwordHash: 'hash', name: 'Utilisateur Test' },
    });
    userId = user.id;
    authHeader = `Bearer ${await jwtService.signAsync({ sub: user.id, email: user.email, role: 'USER' })}`;

    const flight = await prisma.flight.create({
      data: {
        destinationId: destination.id,
        airline: 'TestAir',
        departAirport: 'CDG',
        arriveAirport: 'JFK',
        departTime: new Date(),
        arriveTime: new Date(),
        durationMinutes: 480,
        price: 300, // * 2 voyageurs -> 600
        imageUrl: 'flight.jpg',
      },
    });
    flightId = flight.id;

    const hotel = await prisma.hotel.create({
      data: {
        destinationId: destination.id,
        name: 'Hôtel Test',
        stars: 4,
        pricePerNight: 120, // * 1 voyageur -> 120
        imageUrl: 'hotel.jpg',
        address: '1 rue de Test',
        amenities: JSON.stringify(['wifi']),
      },
    });
    hotelId = hotel.id;
  });

  afterEach(async () => {
    // On repart d'une base vide avant le test suivant (ordre imposé par les clés étrangères).
    await prisma.bookingItem.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.flight.deleteMany();
    await prisma.hotel.deleteMany();
    await prisma.destination.deleteMany();
    await prisma.user.deleteMany();
  });

  function validCard(overrides: Record<string, string> = {}) {
    return {
      cardholderName: 'Jean Dupont',
      cardNumber: '1234567890123456', // se termine par 6 (pair) -> accepté
      expiry: '12/30', // date future
      cvv: '123',
      ...overrides,
    };
  }

  async function fillCart() {
    await request(app.getHttpServer())
      .post('/api/cart/items')
      .set('Authorization', authHeader)
      .send({ type: 'FLIGHT', refId: flightId, travelers: 2, startDate: new Date().toISOString() })
      .expect(201);
    await request(app.getHttpServer())
      .post('/api/cart/items')
      .set('Authorization', authHeader)
      .send({ type: 'HOTEL', refId: hotelId, travelers: 1, startDate: new Date().toISOString() })
      .expect(201);
  }

  it('inscrit le total exact du panier dans Booking.totalPrice en base après un paiement accepté', async () => {
    await fillCart(); // total attendu : 300*2 + 120*1 = 720

    const response = await request(app.getHttpServer())
      .post('/api/payment/checkout')
      .set('Authorization', authHeader)
      .send(validCard())
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.booking.totalPrice).toBe(720);

    // On revérifie directement en base, pas seulement la réponse HTTP :
    // le total renvoyé doit correspondre à ce qui a été réellement écrit.
    const booking = await prisma.booking.findUnique({ where: { id: response.body.booking.id } });
    expect(booking).not.toBeNull();
    expect(booking?.totalPrice).toBe(720);

    // Le total en base doit rester cohérent avec le détail des lignes persistées.
    const items = await prisma.bookingItem.findMany({ where: { bookingId: booking!.id } });
    const recomputedTotal = items.reduce((sum, item) => sum + item.unitPrice * item.travelers, 0);
    expect(recomputedTotal).toBe(booking?.totalPrice);

    // Le panier a bien été vidé après le paiement.
    const remainingCartItems = await prisma.cartItem.findMany({ where: { userId } });
    expect(remainingCartItems).toHaveLength(0);
  });

  it('n\'inscrit aucune réservation en base quand le paiement est refusé', async () => {
    await fillCart();

    const response = await request(app.getHttpServer())
      .post('/api/payment/checkout')
      .set('Authorization', authHeader)
      .send(validCard({ cardNumber: '1234567890123457' })) // se termine par 7 (impair) -> refusé
      .expect(201);

    expect(response.body.success).toBe(false);

    // Aucun total ne doit être persisté puisque le paiement a échoué.
    const bookings = await prisma.booking.findMany({ where: { userId } });
    expect(bookings).toHaveLength(0);

    // Le panier n'est pas vidé sur un paiement refusé.
    const remainingCartItems = await prisma.cartItem.findMany({ where: { userId } });
    expect(remainingCartItems).toHaveLength(2);
  });
});
