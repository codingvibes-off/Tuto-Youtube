import { IsBoolean, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateOfferDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsInt()
  @Min(1)
  @Max(90)
  discountPercent: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

export class UpdateOfferDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(90)
  discountPercent?: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
