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
import { UserDto } from '../models/dto/user-dto';
import { Ticket } from '../models/entities/ticket.entity';
import { User } from '../models/entities/user.entity';
import { TicketsService } from '../services/tickets.service';
import { UsersService } from '../services/users.service';

@ApiTags('users')
@Controller('api/v1/users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private ticketsService: TicketsService,
  ) {}

  @Get()
  @ApiOkResponse({ description: 'Request successfully processed' })
  @ApiInternalServerErrorResponse({
    description: 'An error occurred while processing the request.',
  })
  getAllUsers(@Res() response: Response) {
    this.usersService
      .findAllUsers()
      .then((userList: User[]) => {
        response.status(HttpStatus.OK).json(userList);
      })
      .catch(() => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Ocurrió un error obteniendo los usuarios' });
      });
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
  })
  @ApiInternalServerErrorResponse({
    description: 'An error occurred while processing the request.',
  })
  createUser(@Body() userDto: UserDto, @Res() response: Response) {
    this.usersService
      .createOneUser(userDto)
      .then((newUser: User) => {
        response.status(HttpStatus.CREATED).json(newUser);
      })
      .catch(() => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Ocurrió un error creando el usuario' });
      });
  }

  @Post(':id/ticket')
  @ApiCreatedResponse({
    description: 'The ticket has been successfully created for the user.',
  })
  @ApiInternalServerErrorResponse({
    description: 'An error occurred while processing the request.',
  })
  async createUserTicket(
    @Param('id') userId: number,
    @Res() response: Response,
  ) {
    const user = await this.usersService.findUserById(userId);
    this.ticketsService
      .createUserTicket(user)
      .then((newTicket: Ticket) => {
        response.status(HttpStatus.CREATED).json(newTicket);
      })
      .catch((error) => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: error.message });
      });
  }

  @Put(':id')
  @ApiOkResponse({ description: 'User successfully updated' })
  @ApiInternalServerErrorResponse({
    description: 'An error occurred while processing the request.',
  })
  updateUser(
    @Param('id') id: number,
    @Body() userDto: UserDto,
    @Res() response: Response,
  ) {
    this.usersService
      .updateOneUser(id, userDto)
      .then((newUser: User) => {
        response.status(HttpStatus.OK).json(newUser);
      })
      .catch(() => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Ocurrió un error actualizando el usuario' });
      });
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'User successfully deleted' })
  @ApiInternalServerErrorResponse({
    description: 'An error occurred while processing the request.',
  })
  deleteUser(@Param('id') id: number, @Res() response: Response) {
    this.usersService
      .removeOneUser(id)
      .then(() => {
        response.status(HttpStatus.NO_CONTENT).json();
      })
      .catch(() => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Ocurrió un error eliminando el usuario' });
      });
  }
}
