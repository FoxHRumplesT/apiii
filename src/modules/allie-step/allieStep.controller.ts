import { Controller, Post, Get, Req, Param, HttpCode } from '@nestjs/common';
import { Request } from 'express';
import { AllieStepService } from './allieStep.service';
import { AllieStep } from '../../entities/allie-step.entity';

@Controller('/allie-step')
export class AllieStepController {
  constructor(private readonly allieStepService: AllieStepService) {}

  @Post()
  @HttpCode(200)
  public async create(@Req() req: Request): Promise<AllieStep> {
    return await this.allieStepService.create(req.body);
  }

  @Get(':allieId')
  public async findById(@Param() params: { allieId: string }): Promise<AllieStep[]> {
    return await this.allieStepService.findById(Number(params.allieId));
  }
}
