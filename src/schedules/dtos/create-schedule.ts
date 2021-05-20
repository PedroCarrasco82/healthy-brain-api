import { ObjectId } from 'mongoose';
import { ScheduleTypes } from '../../helpers/schedule-type-enum';

export class CreateScheduleDTO {
  date: Date;
  endDate: Date;
  readonly type: ScheduleTypes;
  description: string;
  readonly consultId?: ObjectId;
  readonly exerciseId?: ObjectId;
}
