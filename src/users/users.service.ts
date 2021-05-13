import { UserAlreadyExists } from './errors/user-already-exists-error';
import { CreateUserDTO } from './dtos/create-user';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async getById(_id: number): Promise<User> {
    const user = await this.userModel.findById(_id).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${_id} not exists`);
    }

    return user;
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const { email } = createUserDTO;

    const findUserByEmail = await this.userModel.findOne({ email }).exec();

    if (findUserByEmail) {
      throw new UserAlreadyExists(email);
    }

    return await this.create(createUserDTO);
  }

  private async create(createUserDTO: CreateUserDTO) {
    createUserDTO.password = await bcrypt.hash(createUserDTO.password, 10);
    const createdUser = new this.userModel(createUserDTO);
    return await createdUser.save();
  }

  async getByEmail(email: string) {
    const user = await this.userModel
      .findOne({ email })
      .select('+password')
      .exec();

    return user;
  }
}
