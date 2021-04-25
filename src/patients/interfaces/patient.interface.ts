import { Document } from 'mongoose';

export interface Patient extends Document {
  readonly _id: number;
  readonly phoneNumber: string;
  readonly birthdayDate: Date;
  readonly email: string;
  name: string;
  password: string;
}
