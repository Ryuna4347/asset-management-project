import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../common/decorators/user.decorator';
import { AuthGuard } from '../common/guards/auth.guard';
import { RequestUser } from '../common/interfaces/request-user.interface';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@ApiTags('계좌')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @ApiOperation({ summary: '계좌 생성' })
  @ApiResponse({ status: 201, description: '계좌 생성 성공' })
  async create(@User() user: RequestUser, @Body() dto: CreateAccountDto) {
    const account = await this.accountsService.create(user.id, dto);
    return { message: '계좌가 생성되었습니다.', data: account };
  }

  @Get()
  @ApiOperation({ summary: '전체 계좌 목록 조회' })
  @ApiResponse({ status: 200, description: '계좌 목록 조회 성공' })
  async findAll(@User() user: RequestUser) {
    const accounts = await this.accountsService.findAll(user.id);
    const data = accounts.map((account) => ({
      id: account.id,
      name: account.name,
      isDefault: account.isDefault,
      assetCount: account._count.assets,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    }));
    return { message: '계좌 목록 조회 성공', data };
  }

  @Get(':id')
  @ApiOperation({ summary: '계좌 단건 조회' })
  @ApiResponse({ status: 200, description: '계좌 조회 성공' })
  @ApiResponse({ status: 404, description: '계좌를 찾을 수 없음' })
  async findOne(
    @User() user: RequestUser,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const account = await this.accountsService.findOne(user.id, id);
    return { message: '계좌 조회 성공', data: account };
  }

  @Patch(':id')
  @ApiOperation({ summary: '계좌 수정' })
  @ApiResponse({ status: 200, description: '계좌 수정 성공' })
  @ApiResponse({ status: 404, description: '계좌를 찾을 수 없음' })
  async update(
    @User() user: RequestUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAccountDto,
  ) {
    const account = await this.accountsService.update(user.id, id, dto);
    return { message: '계좌가 수정되었습니다.', data: account };
  }

  @Delete(':id')
  @ApiOperation({ summary: '계좌 삭제' })
  @ApiResponse({ status: 200, description: '계좌 삭제 성공' })
  @ApiResponse({ status: 404, description: '계좌를 찾을 수 없음' })
  @ApiResponse({ status: 409, description: '연결된 자산이 존재하여 삭제 불가' })
  async remove(
    @User() user: RequestUser,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const account = await this.accountsService.remove(user.id, id);
    return { message: '계좌가 삭제되었습니다.', data: account };
  }

  @Patch(':id/default')
  @ApiOperation({ summary: '기본 계좌 설정' })
  @ApiResponse({ status: 200, description: '기본 계좌 설정 성공' })
  @ApiResponse({ status: 404, description: '계좌를 찾을 수 없음' })
  async setDefault(
    @User() user: RequestUser,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const account = await this.accountsService.setDefault(user.id, id);
    return { message: '기본 계좌가 설정되었습니다.', data: account };
  }
}
