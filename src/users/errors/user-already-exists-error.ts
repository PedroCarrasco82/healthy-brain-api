export class UserAlreadyExists extends Error {
  constructor(email: string) {
    super(`The user with email ${email} already exists.`);
    this.name = 'UserAlreadyExists';
  }
}
