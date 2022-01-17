import { Controller, Post, Get, HttpCode, Req } from '@nestjs/common';
import { Request } from 'express';
import { CountryService } from './country.service';
import { Country } from '../../entities';

@Controller('/country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  @HttpCode(200)
  public async create(@Req() req: Request): Promise<Country> {
    return await this.countryService.create(req.body);
  }
}
