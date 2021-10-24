import { Controller, Get } from '@nestjs/common';
import { AllieService } from './allie.service';
import { Allie } from '../entities/allie.entity';

@Controller('/allie')
export class AllieController {
  constructor(private readonly allieService: AllieService) {}

  @Get()
  findAll(): Promise<Allie[]> {
    return this.allieService.findAll();
  }
}
