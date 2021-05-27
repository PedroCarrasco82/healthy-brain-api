import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateScheduleDTO } from './dtos/create-schedule';
import { UpdateScheduleDTO } from './dtos/update-schedule';
import { Schedule } from './interfaces/schedule.interface';

@Injectable()
export class ScheduleService {
    constructor(@InjectModel('Schedule') private readonly scheduleModel: Model<Schedule>) { }

    async getAll(): Promise<Schedule[]> {
        return await this.scheduleModel.find().exec();
    }

    async getById(_id: string): Promise<Schedule> {
        const schedule = await this.scheduleModel.findById(_id).exec();
        if (!schedule) {
            throw new NotFoundException(`Schedule with id ${_id} not exists`);
        }
        return schedule;
    }

    async createSchedule(createScheduleDTO: CreateScheduleDTO) {
        if (createScheduleDTO.endDate < createScheduleDTO.date) {
            throw new BadRequestException(`A data final ${createScheduleDTO.endDate} deve ser posterior que a data inicial ${createScheduleDTO.date}`);
        }
        const createdSchedule = new this.scheduleModel(createScheduleDTO);
        return await createdSchedule.save();
    }

    async updateSchedule(id: string, updateScheduleDTO: UpdateScheduleDTO) {
        const schedule = this.getById(id);
        if (!schedule) {
            throw new NotFoundException(`Schedule with id ${id} not exists`);
        }
        if (updateScheduleDTO.endDate < updateScheduleDTO.date) {
            throw new BadRequestException(`A data final ${updateScheduleDTO.endDate} deve ser posterior que a data inicial ${updateScheduleDTO.date}`);
        }
        await this.scheduleModel.findByIdAndUpdate({ _id: id }, updateScheduleDTO).exec();
        return this.getById(id);
    }

    async deleteSchedule(id: string) {
        return await this.scheduleModel.deleteOne({ _id: id }).exec();
    }

}
