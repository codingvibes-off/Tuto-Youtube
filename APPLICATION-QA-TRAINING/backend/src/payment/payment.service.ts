import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChargeDto } from './dto/charge.dto';

export interface PaymentResult {
  success: boolean;
  errorCode?: 'EXPIRED_CARD' | 'CARD_DECLINED';
  message?: string;
}

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  // Simulateur de paiement (aucune vraie intégration bancaire, cf. BUGS_CONNUS.md
  // et README) :
  //  - carte expirée (date MM/YY dans le passé)          -> EXPIRED_CARD
  //  - numéro de carte se terminant par un chiffre impair -> CARD_DECLINED
  //  - sinon                                               -> paiement accepté
  // Ce service renvoie systématiquement un message précis. Le front, lui,
  // n'affiche pas ce message (voir BUG_CONNU #3 dans BUGS_CONNUS.md).
  simulate(dto: ChargeDto): PaymentResult {
    const [month, year] = dto.expiry.split('/').map(Number);
    const expiryDate = new Date(2000 + year, month, 0, 23, 59, 59);
    if (expiryDate < new Date()) {
      return { success: false, errorCode: 'EXPIRED_CARD', message: 'Cette carte a expiré. Merci d\'utiliser une autre carte.' };
    }

    const lastDigit = Number(dto.cardNumber.at(-1));
    if (lastDigit % 2 !== 0) {
      return {
        success: false,
        errorCode: 'CARD_DECLINED',
        message: 'Paiement refusé par votre banque. Vérifiez votre solde ou utilisez une autre carte.',
      };
    }

    return { success: true };
  }

  private generateReference(): string {
    return `VYG-${Math.floor(100000 + Math.random() * 899999)}`;
  }

  async checkout(userId: number, dto: ChargeDto) {
    const cartItems = await this.prisma.cartItem.findMany({ where: { userId } });
    if (cartItems.length === 0) {
      throw new BadRequestException('Votre panier est vide.');
    }

    const result = this.simulate(dto);
    if (!result.success) {
      return result;
    }

    const totalPrice = cartItems.reduce((sum, item) => sum + item.unitPrice * item.travelers, 0);

    let reference = this.generateReference();
    // évite (rare) une collision de référence en démo
    while (await this.prisma.booking.findUnique({ where: { reference } })) {
      reference = this.generateReference();
    }

    const booking = await this.prisma.booking.create({
      data: {
        userId,
        reference,
        totalPrice,
        items: {
          create: cartItems.map((item) => ({
            type: item.type,
            refId: item.refId,
            label: item.label,
            imageUrl: item.imageUrl,
            unitPrice: item.unitPrice,
            travelers: item.travelers,
            startDate: item.startDate,
            endDate: item.endDate,
          })),
        },
      },
      include: { items: true },
    });

    await this.prisma.cartItem.deleteMany({ where: { userId } });

    return { success: true, booking };
  }
}
