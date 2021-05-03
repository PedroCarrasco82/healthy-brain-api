import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('PatientService', () => {
  let provider: PatientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientService],
    }).compile();

    provider = module.get<PatientService>(PatientService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
