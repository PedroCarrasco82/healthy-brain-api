export class PatientAlreadyExists extends Error {
  constructor(email: string) {
    super(`The patient with email ${email} already exists.`);
    this.name = 'PatientAlreadyExists';
  }
}
