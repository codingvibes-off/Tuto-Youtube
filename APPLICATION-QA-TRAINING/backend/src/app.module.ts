import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CatalogModule } from './catalog/catalog.module';
import { CartModule } from './cart/cart.module';
import { PaymentModule } from './payment/payment.module';
import { BookingsModule } from './bookings/bookings.module';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';

@Module({
  imports: [PrismaModule, AuthModule, CatalogModule, CartModule, PaymentModule, BookingsModule, AdminModule],
  controllers: [AppController],
})
export class AppModule {}
