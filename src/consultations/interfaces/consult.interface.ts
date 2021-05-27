import { Document, ObjectId } from "mongoose";
import { ConsultStatusTypes } from "src/helpers/consult-type-enum";

export interface Consult extends Document {
    readonly patientId: ObjectId;
    readonly healthProfessionalId: ObjectId;
    consultDateTime: Date;
    rate?: Number;
    endDateTime: Date;
    status: ConsultStatusTypes;
}