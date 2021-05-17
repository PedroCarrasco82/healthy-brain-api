import * as mongoose from 'mongoose';
import { ScheduleTypes } from '../../helpers/schedule-type-enum';

export const ScheduleSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        scheduleType: {
            type: String,
            enum: ScheduleTypes
        },
        description: {
            type: String,
            required: true
        },
        consultId: mongoose.Types.ObjectId,
        exerciseId: mongoose.Types.ObjectId
    }
);