import { IsString, Matches } from 'class-validator';

export class ChargeDto {
  @IsString()
  cardholderName: string;

  @Matches(/^\d{16}$/, { message: 'Le numéro de carte doit contenir 16 chiffres.' })
  cardNumber: string;

  // format attendu : MM/YY
  @Matches(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: 'Date d\'expiration invalide (format MM/YY).' })
  expiry: string;

  @Matches(/^\d{3}$/, { message: 'Le CVV doit contenir 3 chiffres.' })
  cvv: string;
}
