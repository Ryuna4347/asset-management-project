import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: '사용자 이름', required: false })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({ description: '프로필 이미지 URL', required: false })
  @IsOptional()
  @IsString()
  avatarUrl?: string;
}
