import { UnprocessableEntityException } from '../helpers/http-helper';
import { InternalServerErrorException } from '../helpers/http-helper';
import { CreateUserDTO } from './dtos/create-user';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<User> {
    return this.usersService.getById(id);
  }

  @Post()
  async createPatient(@Body() createUserDTO: CreateUserDTO) {
    try {
      await this.usersService.createUser(createUserDTO);
    } catch (error) {
      if (error.name === 'UserAlreadyExists') {
        throw new UnprocessableEntityException(error.message);
      }
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
