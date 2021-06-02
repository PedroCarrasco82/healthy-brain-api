import { PartialType } from '@nestjs/swagger';
import { ConsultStatusTypes } from 'src/helpers/consult-type-enum';
import { CreateConsultationDto } from './create-consultation.dto';

export class UpdateConsultationDto extends PartialType(CreateConsultationDto) {
  consultDateTime?: Date;
  rate?: number;
  endDateTime?: Date;
  status?: ConsultStatusTypes;
}
