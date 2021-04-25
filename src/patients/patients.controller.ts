import { UnprocessableEntityException } from './../helpers/http-helper';
import { InternalServerErrorException } from '../helpers/http-helper';
import { CreatePatientDTO } from './dtos/create-patient';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Patient } from './interfaces/patient.interface';
import { PatientService } from './shared/patient.service';

@Controller('patients')
export class PatientsController {
  constructor(private patientService: PatientService) {}

  @Get()
  async getAll(): Promise<Patient[]> {
    return this.patientService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Patient> {
    return this.patientService.getById(id);
  }

  @Post()
  async createPatient(@Body() createPatientDTO: CreatePatientDTO) {
    try {
      await this.patientService.createPatient(createPatientDTO);
    } catch (error) {
      if (error.name === 'PatientAlreadyExists') {
        throw new UnprocessableEntityException(error.message);
      }

      throw new InternalServerErrorException();
    }
  }
}
