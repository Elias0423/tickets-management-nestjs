import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agent } from '../models/entities/agent.entity';
import { Ticket } from '../models/entities/ticket.entity';
import { User } from '../models/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket) private ticketsRepository: Repository<Ticket>,
    @InjectRepository(Agent) private agentsRepository: Repository<Agent>,
  ) {}

  findAgentTickets(agentId: number): Promise<Ticket[]> {
    return this.ticketsRepository.find({
      relations: { user: true },
      where: {
        agent: { id: agentId },
      },
    });
  }

  async createUserTicket(user: User) {
    const ticket = new Ticket();
    ticket.user = user;
    ticket.agent = await this.getRandomAgent();
    ticket.token = Math.random().toString(36).substring(2, 12).toUpperCase();
    return this.ticketsRepository.save(ticket);
  }

  async getRandomAgent() {
    const agentWithLessTickets = await this.agentsRepository
      .createQueryBuilder('agent')
      .leftJoin(Ticket, 'ticket', 'ticket.agent_id = agent.id')
      .select('agent.id')
      .addSelect('COUNT(ticket.id)', 'total')
      .groupBy('agent.id')
      .orderBy('total', 'ASC')
      .getRawOne();
    if (!agentWithLessTickets)
      throw new NotFoundException('No hay técnicos disponibles');
    return this.agentsRepository.findOneBy({
      id: agentWithLessTickets.agent_id,
    });
  }
}
