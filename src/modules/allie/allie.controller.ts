import { Controller, Post, Get, Req, HttpCode } from '@nestjs/common';
import { Request } from 'express';
import { AllieService } from './allie.service';
import { Allie } from '../../entities/allie.entity';

@Controller('/allie')
export class AllieController {
  constructor(private readonly allieService: AllieService) {}

  @Post()
  @HttpCode(200)
  public async create(@Req() req: Request): Promise<Allie> {
    return await this.allieService.create(req.body);
  }

  @Get()
  public async findAll(): Promise<Allie[]> {
    return await this.allieService.findAll();
  }
}
