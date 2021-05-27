import { Module } from '@nestjs/common';
import { ConsultationsService } from './consultations.service';
import { ConsultationsController } from './consultations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsultSchema } from './interfaces/consult.schema';
import { SchedulesModule } from 'src/schedules/schedules.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    SchedulesModule,
    UsersModule,
    MongooseModule.forFeature([
      {
        name: 'Consult',
        schema: ConsultSchema,
      },
    ]),
  ],
  controllers: [ConsultationsController],
  providers: [ConsultationsService]
})
export class ConsultationsModule {}
