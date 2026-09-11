import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { AdminService } from './admin.service';
import { CreateOfferDto, UpdateOfferDto } from './dto/offer.dto';

@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('bookings')
  bookings() {
    return this.adminService.bookings();
  }

  @Get('stats')
  stats() {
    return this.adminService.stats();
  }

  @Get('offers')
  offers() {
    return this.adminService.offers();
  }

  @Post('offers')
  createOffer(@Body() dto: CreateOfferDto) {
    return this.adminService.createOffer(dto);
  }

  @Patch('offers/:id')
  updateOffer(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateOfferDto) {
    return this.adminService.updateOffer(id, dto);
  }

  @Delete('offers/:id')
  deleteOffer(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteOffer(id);
  }
}
