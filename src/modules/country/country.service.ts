import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from '../../entities/country.entity';
import * as Dto from './dto';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
  ) {}

  public async create(body: Dto.CreateDto): Promise<Country> {
    let countryEntity = new Country();
    countryEntity.name = body.name;
    countryEntity.description = body.description;
    return await this.countryRepository.save(countryEntity);
  }
}
