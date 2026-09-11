import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const destinations = [
  {
    slug: 'tokyo',
    city: 'Tokyo',
    country: 'Japon',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    description: "Néons, temples millénaires et gastronomie d'exception : Tokyo mélange les époques avec une élégance unique.",
    popular: true,
  },
  {
    slug: 'lisbonne',
    city: 'Lisbonne',
    country: 'Portugal',
    imageUrl: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=80',
    description: 'Ruelles pavées, tramways jaunes et lumière dorée sur le Tage : une capitale à taille humaine.',
    popular: true,
  },
  {
    slug: 'bali',
    city: 'Bali',
    country: 'Indonésie',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    description: 'Rizières en terrasses, temples au bord des volcans et plages de sable volcanique.',
    popular: true,
  },
  {
    slug: 'new-york',
    city: 'New York',
    country: 'États-Unis',
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
    description: "La ville qui ne dort jamais, entre gratte-ciels vertigineux et quartiers à l'identité forte.",
    popular: true,
  },
  {
    slug: 'marrakech',
    city: 'Marrakech',
    country: 'Maroc',
    imageUrl: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1200&q=80',
    description: 'Souks animés, riads secrets et montagnes de l\'Atlas en toile de fond.',
    popular: false,
  },
  {
    slug: 'rome',
    city: 'Rome',
    country: 'Italie',
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
    description: 'Deux mille ans d\'histoire à ciel ouvert, entre ruines antiques et trattorias animées.',
    popular: false,
  },
];

const airlines = ['Air France', 'Japan Airlines', 'TAP Portugal', 'Delta Airlines', 'Royal Air Maroc', 'ITA Airways'];

const flightImage = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80';

const hotelImages = [
  'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80',
];

const hotelNamesByCity: Record<string, string[]> = {
  Tokyo: ['The Knot Tokyo', 'Shinjuku Garden Hotel', 'Sakura Bay Suites'],
  Lisbonne: ['Tejo River Boutique', 'Alfama Charme Hotel', 'Bairro Alto Loft'],
  Bali: ['Ubud Jungle Retreat', 'Seminyak Beach Resort', 'Canggu Rice View'],
  'New York': ['Manhattan Skyline Hotel', 'Brooklyn Loft House', 'Central Park Residence'],
  Marrakech: ['Riad Atlas Secret', 'Médina Palm Suites', 'Jardin Majorelle Lodge'],
  Rome: ['Trastevere Boutique', 'Colosseo View Hotel', 'Piazza Navona Suites'],
};

const amenitiesPool = ['Wifi gratuit', 'Piscine', 'Petit-déjeuner inclus', 'Spa', 'Salle de sport', 'Parking', 'Climatisation', 'Bar sur le toit'];

const reviewers = ['Camille D.', 'Yanis B.', 'Léa M.', 'Thomas R.', 'Sarah C.', 'Nicolas P.', 'Inès K.', 'Hugo V.'];
const reviewComments = [
  "Séjour parfait, l'équipe a été aux petits soins du début à la fin.",
  'Emplacement idéal, tout est accessible à pied.',
  'Chambre un peu petite mais très propre et calme.',
  'Rapport qualité-prix excellent, on reviendra sans hésiter.',
  "Le petit-déjeuner mériterait plus de choix, sinon rien à dire.",
  'Vue exceptionnelle, on ne se lassait pas du coucher de soleil.',
];

function pick<T>(arr: T[], i: number): T {
  return arr[i % arr.length];
}

async function main() {
  console.log('Nettoyage de la base...');
  await prisma.review.deleteMany();
  await prisma.bookingItem.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.offer.deleteMany();
  await prisma.hotel.deleteMany();
  await prisma.flight.deleteMany();
  await prisma.destination.deleteMany();
  await prisma.user.deleteMany();

  console.log('Création des comptes de démonstration...');
  const adminPasswordHash = await bcrypt.hash('Admin1234', 10);
  const demoPasswordHash = await bcrypt.hash('Voyage2026', 10);

  await prisma.user.create({
    data: { email: 'admin@voyago.demo', name: 'Équipe Voyago', passwordHash: adminPasswordHash, role: 'ADMIN' },
  });
  await prisma.user.create({
    data: { email: 'alex.martin@voyago.demo', name: 'Alex Martin', passwordHash: demoPasswordHash, role: 'USER' },
  });

  console.log('Création des destinations, vols et hôtels...');
  const now = new Date();

  for (const [index, dest] of destinations.entries()) {
    const destination = await prisma.destination.create({ data: dest });

    // 3 vols par destination, avec des horaires et prix variés
    for (let f = 0; f < 3; f++) {
      const departTime = new Date(now.getTime() + (index + 1) * 3 * 24 * 60 * 60 * 1000 + f * 4 * 60 * 60 * 1000);
      const durationMinutes = 120 + f * 180 + index * 30;
      const arriveTime = new Date(departTime.getTime() + durationMinutes * 60 * 1000);

      await prisma.flight.create({
        data: {
          destinationId: destination.id,
          airline: pick(airlines, index + f),
          departAirport: 'Paris CDG',
          arriveAirport: `${dest.city} (${dest.slug.toUpperCase().slice(0, 3)})`,
          departTime,
          arriveTime,
          durationMinutes,
          price: 220 + f * 140 + index * 35,
          stops: f === 2 ? 1 : 0,
          imageUrl: flightImage,
        },
      });
    }

    // 3 hôtels par destination, avec avis
    const hotelNames = hotelNamesByCity[dest.city] ?? [`${dest.city} Hotel 1`, `${dest.city} Hotel 2`, `${dest.city} Hotel 3`];
    for (let h = 0; h < hotelNames.length; h++) {
      const amenities = amenitiesPool.filter((_, i) => (i + h) % 2 === 0);
      const hotel = await prisma.hotel.create({
        data: {
          destinationId: destination.id,
          name: hotelNames[h],
          stars: 3 + (h % 3),
          pricePerNight: 65 + h * 45 + index * 12,
          imageUrl: pick(hotelImages, index + h),
          address: `${12 + h} rue Centrale, ${dest.city}`,
          amenities: JSON.stringify(amenities),
        },
      });

      const reviewCount = 3 + ((index + h) % 3);
      for (let r = 0; r < reviewCount; r++) {
        await prisma.review.create({
          data: {
            hotelId: hotel.id,
            author: pick(reviewers, index + h + r),
            rating: 3 + ((index + h + r) % 3),
            comment: pick(reviewComments, index + h + r),
          },
        });
      }
    }
  }

  console.log('Création des offres mises en avant...');
  await prisma.offer.createMany({
    data: [
      { title: 'Semaine dorée à Tokyo', description: 'Vol + hôtel 4 étoiles, 7 nuits, petit-déjeuner inclus.', discountPercent: 15, active: true },
      { title: 'Escapade lisboète', description: '3 nuits en boutique-hôtel dans l\'Alfama.', discountPercent: 10, active: true },
      { title: 'Bali en amoureux', description: 'Villa privée avec piscine, 10 nuits.', discountPercent: 20, active: false },
    ],
  });

  console.log('Terminé.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
