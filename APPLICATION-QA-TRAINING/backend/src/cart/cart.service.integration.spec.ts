import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import request from 'supertest';
import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';

// Test D'INTÉGRATION HTTP : contrairement à cart.service.spec.ts (Prisma
// mocké à `null`), ici on démarre une vraie application Nest (mêmes modules,
// mêmes guards, mêmes pipes de validation qu'en prod via main.ts) et on lui
// envoie de vraies requêtes HTTP avec supertest, contre une vraie base
// SQLite (fichier temporaire dédié aux tests). On vérifie donc le
// comportement bout-en-bout : routing, guard JWT, validation des DTO,
// écriture/lecture en base, et codes HTTP (401/403/404) réellement renvoyés.

const BACKEND_ROOT = path.join(__dirname, '../..');
const TEST_DB_PATH = path.join(BACKEND_ROOT, 'prisma', 'test-cart.db');
const TEST_DATABASE_URL = `file:${TEST_DB_PATH}`;

describe('CartController - intégration HTTP (vraie app Nest + vraie base SQLite)', () => {
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
    // sans toucher à la base de dev (dev.db).
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
    // Données de référence réelles, créées en base avant chaque test.
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
        price: 300,
        imageUrl: 'flight.jpg',
      },
    });
    flightId = flight.id;

    const hotel = await prisma.hotel.create({
      data: {
        destinationId: destination.id,
        name: 'Hôtel Test',
        stars: 4,
        pricePerNight: 120,
        imageUrl: 'hotel.jpg',
        address: '1 rue de Test',
        amenities: JSON.stringify(['wifi']),
      },
    });
    hotelId = hotel.id;
  });

  afterEach(async () => {
    // On repart d'une base vide avant le test suivant (ordre imposé par les clés étrangères).
    await prisma.cartItem.deleteMany();
    await prisma.flight.deleteMany();
    await prisma.hotel.deleteMany();
    await prisma.destination.deleteMany();
    await prisma.user.deleteMany();
  });

  it('rejette une requête sans jeton avec un 401 (guard JWT réellement exécuté)', async () => {
    await request(app.getHttpServer()).get('/api/cart').expect(401);
  });

  it('ajoute un vol au panier via POST /api/cart/items et le persiste réellement en base', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/cart/items')
      .set('Authorization', authHeader)
      .send({ type: 'FLIGHT', refId: flightId, travelers: 2, startDate: new Date().toISOString() })
      .expect(201);

    expect(response.body.items).toHaveLength(1);
    expect(response.body.subtotal).toBe(600); // 300 * 2
    expect(response.body.itemCount).toBe(1);

    // On revérifie directement en base, pas seulement la réponse HTTP.
    const rows = await prisma.cartItem.findMany({ where: { userId } });
    expect(rows).toHaveLength(1);
    expect(rows[0].unitPrice).toBe(300);
    expect(rows[0].label).toBe('CDG → Paris');
  });

  it("rejette l'ajout d'un vol inexistant avec une 404", async () => {
    const response = await request(app.getHttpServer())
      .post('/api/cart/items')
      .set('Authorization', authHeader)
      .send({ type: 'FLIGHT', refId: 999999, travelers: 1, startDate: new Date().toISOString() })
      .expect(404);

    expect(response.body.message).toBe('Vol introuvable.');
  });

  it('rejette un payload invalide (validation DTO réelle) avec une 400', async () => {
    await request(app.getHttpServer())
      .post('/api/cart/items')
      .set('Authorization', authHeader)
      .send({ type: 'BUS', refId: flightId, travelers: 1, startDate: new Date().toISOString() })
      .expect(400);
  });

  it('met à jour le nombre de voyageurs via PATCH et recalcule le sous-total en base', async () => {
    const added = await request(app.getHttpServer())
      .post('/api/cart/items')
      .set('Authorization', authHeader)
      .send({ type: 'HOTEL', refId: hotelId, travelers: 1, startDate: new Date().toISOString() })
      .expect(201);
    const itemId = added.body.items[0].id;

    const updated = await request(app.getHttpServer())
      .patch(`/api/cart/items/${itemId}`)
      .set('Authorization', authHeader)
      .send({ travelers: 3 })
      .expect(200);

    expect(updated.body.subtotal).toBe(360); // 120 * 3
    const row = await prisma.cartItem.findUnique({ where: { id: itemId } });
    expect(row?.travelers).toBe(3);
  });

  it("empêche de modifier le panier d'un autre utilisateur (403)", async () => {
    const otherUser = await prisma.user.create({
      data: { email: `other-${Date.now()}@voyago.dev`, passwordHash: 'hash', name: 'Autre' },
    });
    const otherAuthHeader = `Bearer ${await jwtService.signAsync({ sub: otherUser.id, email: otherUser.email, role: 'USER' })}`;

    const added = await request(app.getHttpServer())
      .post('/api/cart/items')
      .set('Authorization', authHeader)
      .send({ type: 'HOTEL', refId: hotelId, travelers: 1, startDate: new Date().toISOString() })
      .expect(201);
    const itemId = added.body.items[0].id;

    await request(app.getHttpServer())
      .patch(`/api/cart/items/${itemId}`)
      .set('Authorization', otherAuthHeader)
      .send({ travelers: 2 })
      .expect(403);

    await prisma.user.delete({ where: { id: otherUser.id } });
  });

  it('supprime tous les articles avec DELETE /api/cart et le vérifie en base', async () => {
    await request(app.getHttpServer())
      .post('/api/cart/items')
      .set('Authorization', authHeader)
      .send({ type: 'FLIGHT', refId: flightId, travelers: 1, startDate: new Date().toISOString() })
      .expect(201);
    await request(app.getHttpServer())
      .post('/api/cart/items')
      .set('Authorization', authHeader)
      .send({ type: 'HOTEL', refId: hotelId, travelers: 1, startDate: new Date().toISOString() })
      .expect(201);

    const cleared = await request(app.getHttpServer()).delete('/api/cart').set('Authorization', authHeader).expect(200);

    expect(cleared.body.items).toHaveLength(0);
    const rows = await prisma.cartItem.findMany({ where: { userId } });
    expect(rows).toHaveLength(0);
  });
});
