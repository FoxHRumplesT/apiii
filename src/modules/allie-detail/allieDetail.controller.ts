import { Controller, Post, Get, Req, HttpCode } from '@nestjs/common';
import { Request } from 'express';
import { AllieDetailService } from './allieDetail.service';
import { AllieDetail } from '../../entities/allie-detail.entity';

@Controller('/allie-detail')
export class AllieDetailController {
  constructor(private readonly allieDetailService: AllieDetailService) {}

  @Post()
  @HttpCode(200)
  public async create(@Req() req: Request): Promise<AllieDetail> {
    return await this.allieDetailService.create(req.body);
  }

  @Get()
  public async findAll(): Promise<AllieDetail[]> {
    return await this.allieDetailService.findAll();
  }
}
