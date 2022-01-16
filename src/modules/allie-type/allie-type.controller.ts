import { Controller, Post, HttpCode, Req, Res } from '@nestjs/common';
import { Request } from 'express';
import { AllieTypeService } from './allie-type.service';
import { AllieType } from '../../entities/allie-type.entity';

@Controller('/allie-type')
export class AllieTypeController {
  constructor(private readonly allieTypeService: AllieTypeService) {}

  @Post()
  @HttpCode(200)
  public async create(@Req() req: Request): Promise<AllieType> {
    return await this.allieTypeService.create(req.body);
  }
}
