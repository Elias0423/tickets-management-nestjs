import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Agent } from './agent.entity';
import { User } from './user.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 15 })
  token: string;

  @ManyToOne(() => User, (user) => user.tickets, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Agent, (agent) => agent.tickets, { nullable: false })
  @JoinColumn({ name: 'agent_id' })
  agent: Agent;
}
