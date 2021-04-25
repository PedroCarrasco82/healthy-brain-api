import { PatientAlreadyExists } from './../errors/patient-already-exists-error';
import { CreatePatientDTO } from '../dtos/create-patient';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Patient } from '../interfaces/patient.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel('Patient') private readonly patientModel: Model<Patient>,
  ) {}

  async getAll(): Promise<Patient[]> {
    return await this.patientModel.find().exec();
  }

  async getById(_id: number): Promise<Patient> {
    const patient = await this.patientModel.findById(_id).exec();
    if (!patient) {
      throw new NotFoundException(`Patient with id ${_id} not exists`);
    }

    return patient;
  }

  async createPatient(createPatientDTO: CreatePatientDTO): Promise<Patient> {
    const { email } = createPatientDTO;

    const findPatientByEmail = await this.patientModel
      .findOne({ email })
      .exec();

    if (findPatientByEmail) {
      throw new PatientAlreadyExists(email);
    }

    return await this.create(createPatientDTO);
  }

  private async create(createPatientDTO: CreatePatientDTO) {
    const createdPatient = new this.patientModel(createPatientDTO);
    return await createdPatient.save();
  }

  private async update(createPatientDTO: CreatePatientDTO) {
    return await this.patientModel
      .findOneAndUpdate(
        { email: createPatientDTO.email },
        { $set: createPatientDTO },
      )
      .exec();
  }
}
