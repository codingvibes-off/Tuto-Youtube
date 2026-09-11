import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class AddCartItemDto {
  @IsIn(['FLIGHT', 'HOTEL'])
  type: 'FLIGHT' | 'HOTEL';

  @IsInt()
  refId: number;

  // BUG_CONNU #2 (voir BUGS_CONNUS.md) : pas de @Min(1) ici non plus, à
  // l'image de SearchQueryDto. Une réservation à 0 voyageur peut donc aller
  // jusqu'au bout du tunnel d'achat.
  @IsInt()
  travelers: number;

  @IsString()
  startDate: string;

  @IsOptional()
  @IsString()
  endDate?: string;
}
