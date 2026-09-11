import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOfferDto, UpdateOfferDto } from './dto/offer.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async bookings() {
    const bookings = await this.prisma.booking.findMany({
      include: { items: true, user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return bookings;
  }

  async stats() {
    const [bookingCount, revenueAgg, userCount] = await Promise.all([
      this.prisma.booking.count({ where: { status: 'CONFIRMED' } }),
      this.prisma.booking.aggregate({ _sum: { totalPrice: true }, where: { status: 'CONFIRMED' } }),
      this.prisma.user.count(),
    ]);
    return {
      bookingCount,
      revenue: revenueAgg._sum.totalPrice ?? 0,
      userCount,
    };
  }

  offers() {
    return this.prisma.offer.findMany({ orderBy: { createdAt: 'desc' } });
  }

  createOffer(dto: CreateOfferDto) {
    return this.prisma.offer.create({ data: { ...dto, active: dto.active ?? true } });
  }

  async updateOffer(id: number, dto: UpdateOfferDto) {
    const offer = await this.prisma.offer.findUnique({ where: { id } });
    if (!offer) throw new NotFoundException('Offre introuvable.');
    return this.prisma.offer.update({ where: { id }, data: dto });
  }

  async deleteOffer(id: number) {
    const offer = await this.prisma.offer.findUnique({ where: { id } });
    if (!offer) throw new NotFoundException('Offre introuvable.');
    await this.prisma.offer.delete({ where: { id } });
    return { success: true };
  }
}
