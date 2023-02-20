import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AgentDto } from '../models/dto/agent-dto';
import { Agent } from '../models/entities/agent.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class AgentsService {
  constructor(
    @InjectRepository(Agent)
    private agentsRepository: Repository<Agent>,
  ) {}

  findAllAgents(): Promise<Agent[]> {
    return this.agentsRepository.find();
  }

  createOneAgent(agentDto: AgentDto) {
    const agent = new Agent();
    agent.name = agentDto.name;
    return this.agentsRepository.save(agent);
  }

  async updateOneAgent(agentId: number, agentDto: AgentDto) {
    const agent = await this.agentsRepository.findOneBy({ id: agentId });
    agent.name = agentDto.name;
    return this.agentsRepository.save(agent);
  }

  deleteOneAgent(id: number): Promise<DeleteResult> {
    return this.agentsRepository.delete(id);
  }
}
