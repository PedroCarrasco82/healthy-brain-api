import { UserTypes } from './../helpers/user-types-enum';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { Consult } from './interfaces/consult.interface';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ScheduleService } from 'src/schedules/schedule.service';
import { CreateScheduleDTO } from 'src/schedules/dtos/create-schedule';
import { UsersService } from 'src/users/users.service';
import { ScheduleTypes } from 'src/helpers/schedule-type-enum';
import { ConsultStatusTypes } from 'src/helpers/consult-type-enum';

@Injectable()
export class ConsultationsService {
  constructor(
    private scheduleService: ScheduleService,
    private usersService: UsersService,
    @InjectModel('Consult') private readonly consultModel: Model<Consult>,
  ) {}

  async getAll(): Promise<Consult[]> {
    return await this.consultModel.find().exec();
  }

  async getById(_id: string): Promise<Consult> {
    const consult = await this.consultModel.findById(_id).exec();
    if (!consult) {
      throw new NotFoundException(`Consulta com o id ${_id} não existe`);
    }
    return consult;
  }

  async createConsult(
    patientId: ObjectId,
    createConsultationDto: CreateConsultationDto,
  ) {
    if (
      createConsultationDto.consultDateTime > createConsultationDto.endDateTime
    ) {
      throw new BadRequestException(
        `A data final ${createConsultationDto.endDateTime} deve ser posterior que a data inicial ${createConsultationDto.consultDateTime}`,
      );
    }

    const createConsult = new this.consultModel({
      patientId,
      ...createConsultationDto,
    });
    createConsult.status = ConsultStatusTypes.WAITING;
    const createId = await createConsult.save();

    const healthProfessional = await this.usersService.getById(
      createConsultationDto.healthProfessionalId,
    );
    const createScheduleDTO: CreateScheduleDTO = {
      date: createConsultationDto.consultDateTime,
      endDate: createConsultationDto.endDateTime,
      type: ScheduleTypes.CONSULT,
      description: `Consulta com o Dr(a) ${healthProfessional.name}`,
      consultId: createId._id,
    };
    this.scheduleService.createSchedule(createScheduleDTO);
    return createId;
  }

  async updateConsult(
    id: string,
    userType: UserTypes,
    updateConsultationDto: UpdateConsultationDto,
  ) {
    if (
      updateConsultationDto.rate &&
      userType === UserTypes.HEALTH_PROFESSIONAL
    ) {
      throw new BadRequestException("health professional can't rate consult");
    }

    if (updateConsultationDto.status && userType === UserTypes.PATIENT) {
      throw new BadRequestException("patient can't change consult status");
    }

    if (
      (updateConsultationDto.consultDateTime &&
        !updateConsultationDto.endDateTime) ||
      (updateConsultationDto.endDateTime &&
        !updateConsultationDto.consultDateTime)
    ) {
      throw new BadRequestException(
        'you must change start and end consult date',
      );
    }

    const consult = this.getById(id);
    if (!consult) {
      throw new NotFoundException(`Consulta com o id ${id} não existe`);
    }
    if (
      updateConsultationDto.consultDateTime > updateConsultationDto.endDateTime
    ) {
      throw new BadRequestException(
        `A data final ${updateConsultationDto.endDateTime} deve ser posterior que a data inicial ${updateConsultationDto.consultDateTime}`,
      );
    }
    await this.consultModel
      .findByIdAndUpdate({ _id: id }, updateConsultationDto)
      .exec();
    return this.getById(id);
  }

  async deleteConsult(id: string) {
    return await this.consultModel.deleteOne({ _id: id }).exec();
  }
}
