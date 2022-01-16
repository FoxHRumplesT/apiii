import { Controller, Post, Get, HttpCode, Req } from '@nestjs/common';
import { Request } from 'express';
import { CityService } from './city.service';
import { City } from '../../entities/city.entity';

@Controller('/city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  @HttpCode(200)
  public async create(@Req() req: Request): Promise<City> {
    return await this.cityService.create(req.body);
  }

  @Get()
  public async findAll(): Promise<City[]> {
    return await this.cityService.findAll();
  }
}
