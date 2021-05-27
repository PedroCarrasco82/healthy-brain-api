import * as mongoose from "mongoose";
import { ConsultStatusTypes } from "src/helpers/consult-type-enum";

export const ConsultSchema = new mongoose.Schema(
    {
        patientId: mongoose.Types.ObjectId,
        healthProfessionalId: mongoose.Types.ObjectId,
        consultDateTime: {
            type: Date,
            required: true
        },
        rate: {
            type: Number
        },
        endDateTime: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ConsultStatusTypes
        }
    },
    {
        timestamps: true
    }
);