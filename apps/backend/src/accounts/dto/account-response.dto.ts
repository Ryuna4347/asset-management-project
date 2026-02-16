import { ApiProperty } from '@nestjs/swagger';

export class AccountResponseDto {
  @ApiProperty({ description: '계좌 ID' })
  id!: string;

  @ApiProperty({ description: '계좌 이름' })
  name!: string;

  @ApiProperty({ description: '기본 계좌 여부' })
  isDefault!: boolean;

  @ApiProperty({ description: '자산 수', required: false })
  assetCount?: number;

  @ApiProperty({ description: '생성일' })
  createdAt!: Date;

  @ApiProperty({ description: '수정일' })
  updatedAt!: Date;
}
