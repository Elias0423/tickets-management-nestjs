import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentsController } from './controllers/agents.controller';
import { UsersController } from './controllers/users.controller';
import { Agent } from './models/entities/agent.entity';
import { Ticket } from './models/entities/ticket.entity';
import { User } from './models/entities/user.entity';
import { AgentsService } from './services/agents.service';
import { TicketsService } from './services/tickets.service';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, User, Agent])],
  providers: [TicketsService, UsersService, AgentsService],
  controllers: [UsersController, AgentsController],
})
export class TicketsModule {}
