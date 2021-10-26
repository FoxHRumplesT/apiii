import { Controller, Post, Req, HttpCode } from '@nestjs/common';
import { Request } from 'express';
import { AllieService } from './allie.service';
import { Allie } from '../../entities';

@Controller('/allie')
export class AllieController {
  constructor(private readonly allieService: AllieService) {}

  @Post()
  @HttpCode(200)
  public async create(@Req() req: Request): Promise<Allie> {
    return await this.allieService.create(req.body);
  }
}
