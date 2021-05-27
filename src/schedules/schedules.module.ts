import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { SchedulesController } from './schedules.controller';
import { ScheduleSchema } from './interfaces/schedule.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Schedule',
        schema: ScheduleSchema,
      },
    ]),
  ],
  controllers: [SchedulesController],
  providers: [ScheduleService],
  exports: [ScheduleService]
})
export class SchedulesModule {}
