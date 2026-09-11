import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

// BUG_CONNU #1 (voir BUGS_CONNUS.md) : la règle ci-dessous (8 caractères +
// au moins un chiffre) est PLUS STRICTE que celle affichée côté front
// (frontend/src/app/features/auth/register.component.ts), qui n'annonce
// que "6 caractères minimum" et ne vérifie aucun chiffre. Un mot de passe
// de 6-7 caractères sans chiffre est donc accepté par le formulaire mais
// rejeté ici.
export class RegisterDto {
  @IsEmail({}, { message: 'Adresse email invalide.' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères.' })
  @Matches(/\d/, { message: 'Le mot de passe doit contenir au moins un chiffre.' })
  password: string;

  @IsString()
  @MinLength(2, { message: 'Le nom doit contenir au moins 2 caractères.' })
  name: string;
}
