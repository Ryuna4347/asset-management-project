import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findOrCreateProfile(
    userId: string,
    email: string,
    fullName?: string,
    avatarUrl?: string,
  ): Promise<Profile> {
    this.logger.log(`Finding or creating profile for user: ${userId}`);

    const profile = await this.prisma.profile.upsert({
      where: { id: userId },
      update: {
        email,
        ...(fullName !== undefined && { fullName }),
        ...(avatarUrl !== undefined && { avatarUrl }),
      },
      create: {
        id: userId,
        email,
        fullName: fullName ?? null,
        avatarUrl: avatarUrl ?? null,
      },
    });

    this.logger.log(`Profile ready for user: ${userId}`);
    return profile;
  }

  async getProfile(userId: string): Promise<Profile> {
    this.logger.log(`Fetching profile for user: ${userId}`);

    const profile = await this.prisma.profile.findUnique({
      where: { id: userId },
    });

    if (!profile) {
      throw new NotFoundException('사용자 프로필을 찾을 수 없습니다.');
    }

    return profile;
  }
}
