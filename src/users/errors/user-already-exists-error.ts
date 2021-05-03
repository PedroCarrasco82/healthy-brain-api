import { UnprocessableEntityException } from '../../helpers/http-helper';

export class UserAlreadyExists extends UnprocessableEntityException {
  constructor(email: string) {
    super(`The user with email ${email} already exists.`);
  }
}
