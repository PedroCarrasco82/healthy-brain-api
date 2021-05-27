import { ObjectId } from "mongoose";

export class CreateConsultationDto {
    readonly patientId: ObjectId;
    readonly healthProfessionalId: ObjectId;
    consultDateTime: Date;
    endDateTime: Date;
}
