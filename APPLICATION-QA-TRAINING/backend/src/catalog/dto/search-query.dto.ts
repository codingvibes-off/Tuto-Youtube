import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

// BUG_CONNU #2 (voir BUGS_CONNUS.md) : le volet "voyageurs" est corrigé
// (bornes 1-9 ci-dessous), mais rien n'empêche encore `returnDate` d'être
// antérieure à `departDate` : il n'existe aucune validation croisée entre
// les deux champs.
export class SearchQueryDto {
  @IsOptional()
  @IsString()
  destination?: string;

  @IsOptional()
  @IsInt()
  destinationId?: number;

  @IsOptional()
  @IsString()
  departDate?: string;

  @IsOptional()
  @IsString()
  returnDate?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(9)
  travelers?: number;

  @IsOptional()
  @Type(() => Number)
  maxPrice?: number;

  @IsOptional()
  @Type(() => Number)
  minRating?: number;

  @IsOptional()
  @IsIn(['recommended', 'price-asc', 'price-desc', 'rating'])
  sort?: string;
}
