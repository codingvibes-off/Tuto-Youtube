import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { SearchQueryDto } from './dto/search-query.dto';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('destinations')
  destinations(@Query('query') query?: string) {
    return this.catalogService.destinations(query);
  }

  @Get('destinations/:slug')
  destination(@Param('slug') slug: string) {
    return this.catalogService.destination(slug);
  }

  @Get('flights')
  flights(@Query() query: SearchQueryDto) {
    return this.catalogService.flights(query);
  }

  @Get('flights/:id')
  flight(@Param('id', ParseIntPipe) id: number) {
    return this.catalogService.flight(id);
  }

  @Get('hotels')
  hotels(@Query() query: SearchQueryDto) {
    return this.catalogService.hotels(query);
  }

  @Get('hotels/:id')
  hotel(@Param('id', ParseIntPipe) id: number) {
    return this.catalogService.hotel(id);
  }

  @Get('hotels/:id/reviews')
  reviews(@Param('id', ParseIntPipe) id: number) {
    return this.catalogService.reviews(id);
  }
}
