import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({ description: '계좌 이름', example: '키움증권' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name!: string;

  @ApiProperty({ description: '기본 계좌 여부', required: false, default: false })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
