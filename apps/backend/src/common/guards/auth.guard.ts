import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(private readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('인증 토큰이 제공되지 않았습니다.');
    }

    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseServiceKey =
      this.configService.get<string>('SUPABASE_SERVICE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      this.logger.error('Supabase configuration is missing');
      throw new UnauthorizedException('서버 인증 설정 오류가 발생했습니다.');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      this.logger.warn(`Authentication failed: ${error?.message}`);
      throw new UnauthorizedException('유효하지 않은 인증 토큰입니다.');
    }

    request.user = {
      id: user.id,
      email: user.email,
    };

    return true;
  }

  private extractToken(request: any): string | null {
    const supabaseToken = request.headers['x-supabase-token'];
    if (supabaseToken) {
      return supabaseToken;
    }

    const authorization = request.headers['authorization'];
    if (authorization) {
      const [type, token] = authorization.split(' ');
      if (type === 'Bearer' && token) {
        return token;
      }
    }

    return null;
  }
}
