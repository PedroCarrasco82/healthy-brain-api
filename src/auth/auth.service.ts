import { BadRequestException } from './../helpers/http-helper';
import { UserLoginDTO } from './dtos/user-login';
import { UserNotFoundException } from './errors/user-no-exists';
import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userLoginDto: UserLoginDTO) {
    const user = await this.usersService.getByEmail(userLoginDto.email);
    if (!user) throw new UserNotFoundException();

    const passwordCompare = await bcrypt.compare(
      userLoginDto.password,
      user.password,
    );
    if (!passwordCompare) throw new BadRequestException('Invalid password');
    const payload = { id: user._id, userType: user.userType };
    user.password = undefined;
    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }
}
