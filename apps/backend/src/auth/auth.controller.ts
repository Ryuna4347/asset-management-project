import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../common/guards/auth.guard';
import { User } from '../common/decorators/user.decorator';
import { RequestUser } from '../common/interfaces/request-user.interface';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('인증')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: '로그인 / 프로필 생성' })
  @ApiResponse({ status: 200, description: '로그인 성공' })
  @ApiResponse({ status: 401, description: '인증 실패' })
  async login(@User() user: RequestUser, @Body() loginDto: LoginDto) {
    const profile = await this.authService.findOrCreateProfile(
      user.id,
      user.email,
      loginDto.fullName,
      loginDto.avatarUrl,
    );

    return { message: '로그인 성공', data: profile };
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: '내 프로필 조회' })
  @ApiResponse({ status: 200, description: '사용자 정보 조회 성공' })
  @ApiResponse({ status: 401, description: '인증 실패' })
  @ApiResponse({ status: 404, description: '프로필을 찾을 수 없음' })
  async me(@User() user: RequestUser) {
    const profile = await this.authService.getProfile(user.id);

    return { message: '사용자 정보 조회 성공', data: profile };
  }

  @Post('logout')
  @ApiOperation({ summary: '로그아웃' })
  @ApiResponse({ status: 200, description: '로그아웃 성공' })
  logout() {
    return { message: '로그아웃 성공' };
  }
}
