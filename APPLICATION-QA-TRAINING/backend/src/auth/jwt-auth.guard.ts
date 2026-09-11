import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface AuthenticatedUser {
  userId: number;
  email: string;
  role: 'USER' | 'ADMIN';
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const header: string | undefined = request.headers['authorization'];
    const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;

    if (!token) {
      throw new UnauthorizedException('Authentification requise.');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      const user: AuthenticatedUser = { userId: payload.sub, email: payload.email, role: payload.role };
      request.user = user;
      return true;
    } catch {
      throw new UnauthorizedException('Session expirée ou invalide.');
    }
  }
}
