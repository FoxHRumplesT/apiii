import { Controller, Post, Get, Req, HttpCode } from '@nestjs/common';
import { Request } from 'express';
import { AllieDetailTypeService } from './allieDetailType.service';
import { AllieDetailType } from '../../entities/allie-detail-type.entity';

@Controller('/allie-detail-type')
export class AllieDetailTypeController {
  constructor(private readonly allieDetailTypeService: AllieDetailTypeService) {}

  @Post()
  @HttpCode(200)
  public async create(@Req() req: Request): Promise<AllieDetailType> {
    return await this.allieDetailTypeService.create(req.body);
  }

  @Get()
  public async findAll(): Promise<AllieDetailType[]> {
    return await this.allieDetailTypeService.findAll();
  }
}
