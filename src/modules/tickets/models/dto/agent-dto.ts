import { ApiProperty } from '@nestjs/swagger';
export class AgentDto {
  @ApiProperty({ description: "The agent's name" })
  readonly name: string;
}
