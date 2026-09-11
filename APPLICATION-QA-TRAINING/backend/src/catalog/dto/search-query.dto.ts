import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

// BUG_CONNU #2 (voir BUGS_CONNUS.md) : `travelers` est bien un entier
// (@IsInt) mais aucune borne minimale n'est imposée ici (pas de @Min(1)).
// Rien n'empêche non plus `returnDate` d'être antérieure à `departDate` :
// il n'existe aucune validation croisée entre les deux champs.
// -> une recherche avec 0 voyageur ou un retour avant le départ est acceptée
// telle quelle par l'API.
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
