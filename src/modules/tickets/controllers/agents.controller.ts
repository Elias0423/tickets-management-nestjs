import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { AgentDto } from '../models/dto/agent-dto';
import { Agent } from '../models/entities/agent.entity';
import { AgentsService } from '../services/agents.service';
import { Ticket } from '../models/entities/ticket.entity';
import { TicketsService } from '../services/tickets.service';
@ApiTags('agents')
@Controller('agents')
export class AgentsController {
  constructor(
    private agentsService: AgentsService,
    private ticketsService: TicketsService,
  ) {}

  @Get()
  @ApiOkResponse({ description: 'Request successfully processed' })
  @ApiInternalServerErrorResponse({
    description: 'An error occurred while processing the request.',
  })
  getAllAgents(@Res() response: Response) {
    this.agentsService
      .findAllAgents()
      .then((agentList: Agent[]) => {
        response.status(HttpStatus.OK).json(agentList);
      })
      .catch(() => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Ocurrió un error obteniendo los agentes' });
      });
  }

  @Get(':id/tickets')
  @ApiOkResponse({ description: 'Request successfully processed' })
  @ApiInternalServerErrorResponse({
    description: 'An error occurred while processing the request.',
  })
  getAgentTickets(@Param('id') agentId: number, @Res() response: Response) {
    this.ticketsService
      .findAgentTickets(agentId)
      .then((ticketList: Ticket[]) => {
        response.status(HttpStatus.OK).json(ticketList);
      })
      .catch(() => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Ocurrió un error obteniendo los tickets' });
      });
  }

  @Post()
  @ApiCreatedResponse({ description: 'Agent successfully created.' })
  @ApiInternalServerErrorResponse({
    description: 'An error occurred while processing the request.',
  })
  createAgent(@Body() agentDto: AgentDto, @Res() response: Response) {
    this.agentsService
      .createOneAgent(agentDto)
      .then((newAgent: Agent) => {
        response.status(HttpStatus.CREATED).json(newAgent);
      })
      .catch(() => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Ocurrió un error creando el agente' });
      });
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Agent successfully updated' })
  @ApiInternalServerErrorResponse({
    description: 'An error occurred while processing the request.',
  })
  updateAgent(
    @Param('id') id: number,
    @Body() agentDto: AgentDto,
    @Res() response: Response,
  ) {
    this.agentsService
      .updateOneAgent(id, agentDto)
      .then((newAgent: Agent) => {
        response.status(HttpStatus.OK).json(newAgent);
      })
      .catch(() => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Ocurrió un error actualizando el agente' });
      });
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Agent successfully deleted' })
  @ApiInternalServerErrorResponse({
    description: 'An error occurred while processing the request.',
  })
  deleteAgent(@Param('id') id: number, @Res() response: Response) {
    this.agentsService
      .deleteOneAgent(id)
      .then(() => {
        response.status(HttpStatus.NO_CONTENT).json();
      })
      .catch(() => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Ocurrió un error eliminando el agente' });
      });
  }
}
