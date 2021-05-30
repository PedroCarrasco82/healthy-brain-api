import { UnauthorizedException } from './../helpers/http-helper';
import { UserTypes } from './../helpers/user-types-enum';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ConsultationsService } from './consultations.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { Consult } from './interfaces/consult.interface';

@Controller('consultations')
export class ConsultationsController {
  constructor(private consultationsService: ConsultationsService) {}

  @Get()
  async getAll(): Promise<Consult[]> {
    return this.consultationsService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Consult> {
    return this.consultationsService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createConsultationDto: CreateConsultationDto,
    @Request() req,
  ) {
    try {
      if (req.user.userTypes !== UserTypes.PATIENT) {
        throw new UnauthorizedException('the user must be patient');
      }
      await this.consultationsService.createConsult(createConsultationDto);
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateConsultationDto: UpdateConsultationDto,
  ): Promise<Consult> {
    try {
      return this.consultationsService.updateConsult(id, updateConsultationDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      this.consultationsService.deleteConsult(id);
    } catch (error) {
      throw error;
    }
  }
}
