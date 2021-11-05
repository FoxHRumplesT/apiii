import { Controller, Post, Get, HttpCode, Req } from '@nestjs/common';
import { Request } from 'express';
import { CityService } from './city.service';
import { City } from '../../entities';

@Controller('/city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  @HttpCode(200)
  public async create(@Req() req: Request): Promise<City> {
    return await this.cityService.create(req.body);
  }
}
