import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  private summarize(items: { unitPrice: number; travelers: number }[]) {
    const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.travelers, 0);
    return { subtotal, itemCount: items.length };
  }

  async list(userId: number) {
    const items = await this.prisma.cartItem.findMany({ where: { userId }, orderBy: { createdAt: 'asc' } });
    return { items, ...this.summarize(items) };
  }

  async add(userId: number, dto: AddCartItemDto) {
    let label: string;
    let imageUrl: string;
    let unitPrice: number;

    if (dto.type === 'FLIGHT') {
      const flight = await this.prisma.flight.findUnique({ where: { id: dto.refId }, include: { destination: true } });
      if (!flight) throw new NotFoundException('Vol introuvable.');
      label = `${flight.departAirport} → ${flight.destination.city}`;
      imageUrl = flight.imageUrl;
      unitPrice = flight.price;
    } else {
      const hotel = await this.prisma.hotel.findUnique({ where: { id: dto.refId } });
      if (!hotel) throw new NotFoundException('Hôtel introuvable.');
      label = hotel.name;
      imageUrl = hotel.imageUrl;
      unitPrice = hotel.pricePerNight;
    }

    await this.prisma.cartItem.create({
      data: {
        userId,
        type: dto.type,
        refId: dto.refId,
        label,
        imageUrl,
        unitPrice,
        travelers: dto.travelers,
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : null,
      },
    });

    return this.list(userId);
  }

  async update(userId: number, itemId: number, dto: UpdateCartItemDto) {
    const item = await this.prisma.cartItem.findUnique({ where: { id: itemId } });
    if (!item) throw new NotFoundException('Article du panier introuvable.');
    if (item.userId !== userId) throw new ForbiddenException();

    await this.prisma.cartItem.update({ where: { id: itemId }, data: { travelers: dto.travelers } });
    return this.list(userId);
  }

  async remove(userId: number, itemId: number) {
    const item = await this.prisma.cartItem.findUnique({ where: { id: itemId } });
    if (!item) throw new NotFoundException('Article du panier introuvable.');
    if (item.userId !== userId) throw new ForbiddenException();

    await this.prisma.cartItem.delete({ where: { id: itemId } });
    return this.list(userId);
  }

  async clear(userId: number) {
    await this.prisma.cartItem.deleteMany({ where: { userId } });
    return this.list(userId);
  }
}
