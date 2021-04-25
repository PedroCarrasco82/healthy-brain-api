import { PatientService } from './shared/patient.service';
import { PatientsController } from './patients.controller';
import { PatientSchema } from './interfaces/patient.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Patient',
        schema: PatientSchema,
      },
    ]),
  ],
  controllers: [PatientsController],
  providers: [PatientService],
})
export class PatientsModule {}
