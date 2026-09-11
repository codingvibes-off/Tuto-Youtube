import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SearchQueryDto } from './dto/search-query.dto';

@Injectable()
export class CatalogService {
  constructor(private readonly prisma: PrismaService) {}

  destinations(query?: string) {
    return this.prisma.destination.findMany({
      where: query
        ? {
            OR: [
              { city: { contains: query } },
              { country: { contains: query } },
            ],
          }
        : undefined,
      orderBy: { popular: 'desc' },
    });
  }

  async destination(slug: string) {
    const destination = await this.prisma.destination.findUnique({ where: { slug } });
    if (!destination) throw new NotFoundException('Destination introuvable.');
    return destination;
  }

  private async hotelWithRating(hotelId: number) {
    const reviews = await this.prisma.review.findMany({ where: { hotelId } });
    const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
    return { rating: Math.round(avg * 10) / 10, reviewCount: reviews.length };
  }

  async flights(dto: SearchQueryDto) {
    const flights = await this.prisma.flight.findMany({
      where: {
        destinationId: dto.destinationId,
        destination: dto.destination
          ? { OR: [{ city: { contains: dto.destination } }, { country: { contains: dto.destination } }] }
          : undefined,
        price: dto.maxPrice ? { lte: dto.maxPrice } : undefined,
      },
      include: { destination: true },
      orderBy: { departTime: 'asc' },
    });

    let result = flights;
    if (dto.sort === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    if (dto.sort === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }

  async flight(id: number) {
    const flight = await this.prisma.flight.findUnique({ where: { id }, include: { destination: true } });
    if (!flight) throw new NotFoundException('Vol introuvable.');
    return flight;
  }

  async hotels(dto: SearchQueryDto) {
    const hotels = await this.prisma.hotel.findMany({
      where: {
        destinationId: dto.destinationId,
        destination: dto.destination
          ? { OR: [{ city: { contains: dto.destination } }, { country: { contains: dto.destination } }] }
          : undefined,
        pricePerNight: dto.maxPrice ? { lte: dto.maxPrice } : undefined,
      },
      include: { destination: true },
      orderBy: { pricePerNight: 'asc' },
    });

    let enriched = await Promise.all(
      hotels.map(async (hotel) => ({
        ...hotel,
        amenities: JSON.parse(hotel.amenities) as string[],
        ...(await this.hotelWithRating(hotel.id)),
      })),
    );

    if (dto.minRating) enriched = enriched.filter((h) => h.rating >= dto.minRating!);
    if (dto.sort === 'price-asc') enriched = [...enriched].sort((a, b) => a.pricePerNight - b.pricePerNight);
    if (dto.sort === 'price-desc') enriched = [...enriched].sort((a, b) => b.pricePerNight - a.pricePerNight);
    if (dto.sort === 'rating') enriched = [...enriched].sort((a, b) => b.rating - a.rating);

    return enriched;
  }

  async hotel(id: number) {
    const hotel = await this.prisma.hotel.findUnique({ where: { id }, include: { destination: true } });
    if (!hotel) throw new NotFoundException('Hôtel introuvable.');
    const rating = await this.hotelWithRating(id);
    return { ...hotel, amenities: JSON.parse(hotel.amenities) as string[], ...rating };
  }

  reviews(hotelId: number) {
    return this.prisma.review.findMany({ where: { hotelId }, orderBy: { createdAt: 'desc' } });
  }
}
