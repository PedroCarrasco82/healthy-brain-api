import { Document, ObjectId } from 'mongoose';
import { ScheduleTypes } from '../../helpers/schedule-type-enum';

export interface Schedule extends Document {
    date: Date;
    endDate: Date;
    readonly type: ScheduleTypes;
    description: String;
    readonly consultId?: ObjectId;
    readonly exerciseId?: ObjectId
}