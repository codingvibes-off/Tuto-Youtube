import { IsInt } from 'class-validator';

export class UpdateCartItemDto {
  @IsInt()
  travelers: number;
}
