import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Account, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  private readonly logger = new Logger(AccountsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateAccountDto): Promise<Account> {
    this.logger.log(`Creating account "${dto.name}" for user: ${userId}`);

    try {
      return await this.prisma.$transaction(async (tx) => {
        if (dto.isDefault) {
          await tx.account.updateMany({
            where: { userId, isDefault: true },
            data: { isDefault: false },
          });
        }

        return tx.account.create({
          data: {
            userId,
            name: dto.name,
            isDefault: dto.isDefault ?? false,
          },
        });
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('이미 동일한 이름의 계좌가 존재합니다.');
      }
      throw error;
    }
  }

  async findAll(userId: string) {
    return this.prisma.account.findMany({
      where: { userId },
      include: { _count: { select: { assets: true } } },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findOne(userId: string, accountId: string): Promise<Account> {
    const account = await this.prisma.account.findFirst({
      where: { id: accountId, userId },
    });

    if (!account) {
      throw new NotFoundException('계좌를 찾을 수 없습니다.');
    }

    return account;
  }

  async update(
    userId: string,
    accountId: string,
    dto: UpdateAccountDto,
  ): Promise<Account> {
    await this.findOne(userId, accountId);

    try {
      return await this.prisma.$transaction(async (tx) => {
        if (dto.isDefault) {
          await tx.account.updateMany({
            where: { userId, isDefault: true },
            data: { isDefault: false },
          });
        }

        return tx.account.update({
          where: { id: accountId },
          data: dto,
        });
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('이미 동일한 이름의 계좌가 존재합니다.');
      }
      throw error;
    }
  }

  async remove(userId: string, accountId: string): Promise<Account> {
    const account = await this.prisma.account.findFirst({
      where: { id: accountId, userId },
      include: { _count: { select: { assets: true } } },
    });

    if (!account) {
      throw new NotFoundException('계좌를 찾을 수 없습니다.');
    }

    if (account._count.assets > 0) {
      throw new ConflictException(
        `이 계좌에 연결된 자산이 ${account._count.assets}개 있습니다. 자산을 먼저 이동하거나 삭제해주세요.`,
      );
    }

    return this.prisma.account.delete({
      where: { id: accountId },
    });
  }

  async setDefault(userId: string, accountId: string): Promise<Account> {
    await this.findOne(userId, accountId);

    return this.prisma.$transaction(async (tx) => {
      await tx.account.updateMany({
        where: { userId, isDefault: true },
        data: { isDefault: false },
      });

      return tx.account.update({
        where: { id: accountId },
        data: { isDefault: true },
      });
    });
  }
}
