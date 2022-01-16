import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from '../../entities/city.entity';
import * as Dto from './dto';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  public async create(body: Dto.CreateDto): Promise<City> {
    let cityEntity = new City();
    cityEntity.countryId = body.countryId;
    cityEntity.name = body.name;
    cityEntity.description = body.description;
    return await this.cityRepository.save(cityEntity);
  }

  public async findAll(): Promise<City[]> {
    return await this.cityRepository.find();
  }
}
