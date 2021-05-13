import { NotFoundException } from '../../helpers/http-helper';

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super(`This user not found, please, check your email and password.`);
  }
}
