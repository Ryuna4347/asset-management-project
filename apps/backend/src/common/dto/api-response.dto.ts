import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T> {
  @ApiProperty({ description: '응답 메시지' })
  message!: string;

  @ApiProperty({ description: '응답 데이터', required: false })
  data?: T;
}
