import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: "The user's name" })
  readonly name: string;

  @ApiProperty({ description: "The user's address" })
  readonly address: string;
}
