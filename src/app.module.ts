import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent } from './modules/tickets/models/entities/agent.entity';
import { User } from './modules/tickets/models/entities/user.entity';
import { Ticket } from './modules/tickets/models/entities/ticket.entity';
import { TicketsModule } from './modules/tickets/tickets.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'userpwd',
      database: 'services',
      entities: [Agent, User, Ticket],
      synchronize: true,
    }),
    TicketsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
