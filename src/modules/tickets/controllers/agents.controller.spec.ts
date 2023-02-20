import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Agent } from '../models/entities/agent.entity';
import { Ticket } from '../models/entities/ticket.entity';
import { AgentsService } from '../services/agents.service';
import { TicketsService } from '../services/tickets.service';
import { AgentsController } from './agents.controller';

describe('AgentsController', () => {
  let agentsController: AgentsController;
  let agentsService: AgentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgentsController],
      providers: [
        AgentsService,
        TicketsService,
        { provide: getRepositoryToken(Agent), useValue: jest.fn() },
        { provide: getRepositoryToken(Ticket), useValue: jest.fn() },
      ],
    }).compile();

    agentsController = module.get<AgentsController>(AgentsController);
    agentsService = module.get<AgentsService>(AgentsService);
  });

  it('should be defined', () => {
    expect(agentsController).toBeDefined();
  });
});
