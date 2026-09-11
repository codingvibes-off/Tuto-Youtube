import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  list(userId: number) {
    return this.prisma.booking.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: number, id: number) {
    const booking = await this.prisma.booking.findUnique({ where: { id }, include: { items: true } });
    if (!booking) throw new NotFoundException('Réservation introuvable.');
    if (booking.userId !== userId) throw new ForbiddenException();
    return booking;
  }

  async cancel(userId: number, id: number) {
    const booking = await this.findOne(userId, id);
    if (booking.status === 'CANCELLED') {
      throw new BadRequestException('Cette réservation est déjà annulée.');
    }
    return this.prisma.booking.update({ where: { id }, data: { status: 'CANCELLED' }, include: { items: true } });
  }
}
