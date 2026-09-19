import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class AddCartItemDto {
  @IsIn(['FLIGHT', 'HOTEL'])
  type: 'FLIGHT' | 'HOTEL';

  @IsInt()
  refId: number;

  @IsInt()
  @Min(1)
  @Max(9)
  travelers: number;

  @IsString()
  startDate: string;

  @IsOptional()
  @IsString()
  endDate?: string;
}
