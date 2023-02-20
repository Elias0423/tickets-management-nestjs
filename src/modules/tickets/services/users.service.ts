import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../models/dto/user-dto';
import { User } from '../models/entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findUserById(userId: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('El usuario no existe');
    return user;
  }

  createOneUser(userDto: UserDto) {
    const user = new User();
    user.name = userDto.name;
    user.address = userDto.address;
    return this.usersRepository.save(user);
  }

  async updateOneUser(userId: number, userDto: UserDto) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    user.name = userDto.name;
    user.address = userDto.address;
    return this.usersRepository.save(user);
  }

  removeOneUser(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }
}
