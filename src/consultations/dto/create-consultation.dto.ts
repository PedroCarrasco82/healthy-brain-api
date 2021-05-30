import { ObjectId } from 'mongoose';

export class CreateConsultationDto {
  readonly healthProfessionalId: ObjectId;
  consultDateTime: Date;
  endDateTime: Date;
}
