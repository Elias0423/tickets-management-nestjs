import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Agent } from '../models/entities/agent.entity';
import { Ticket } from '../models/entities/ticket.entity';
import { User } from '../models/entities/user.entity';
import { AgentsService } from '../services/agents.service';
import { TicketsService } from '../services/tickets.service';
import { UsersService } from '../services/users.service';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        TicketsService,
        AgentsService,
        { provide: getRepositoryToken(User), useValue: jest.fn() },
        { provide: getRepositoryToken(Ticket), useValue: jest.fn() },
        { provide: getRepositoryToken(Agent), useValue: jest.fn() },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
