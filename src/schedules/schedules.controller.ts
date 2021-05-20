import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateScheduleDTO } from './dtos/create-schedule';
import { UpdateScheduleDTO } from './dtos/update-schedule';
import { Schedule } from './interfaces/schedule.interface';
import { ScheduleService } from './schedule.service';

@Controller('schedules')
export class SchedulesController {
  constructor(private scheduleService: ScheduleService) {}

  @Get()
  async getAll(): Promise<Schedule[]> {
    return this.scheduleService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Schedule> {
    return this.scheduleService.getById(id);
  }

  @Post()
  async createSchedule(@Body() createScheduleDTO: CreateScheduleDTO) {
    try {
      await this.scheduleService.createSchedule(createScheduleDTO);
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException(
          `O campo ${Object.keys(error.errors)[0]} é inválido`,
        );
      }
      if (error === 'ExceptionsHandler') {
        throw error;
      }
      console.log(error.name);
      console.log('#########');
      console.log(error);
      throw error;
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateScheduleDTO: UpdateScheduleDTO,
  ): Promise<Schedule> {
    try {
      return this.scheduleService.updateSchedule(id, updateScheduleDTO);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      this.scheduleService.deleteSchedule(id);
    } catch (error) {
      throw error;
    }
  }
}
