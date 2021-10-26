import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Allie } from '../../entities';
import * as Dto from './dto';

@Injectable()
export class AllieService {
  constructor(
    @InjectRepository(Allie)
    private allieRepository: Repository<Allie>,
  ) {}

  public async create(body: Dto.CreateDto): Promise<Allie> {
    let allieEntity = new Allie();
    allieEntity.allieTypeId = body.allieTypeId;
    allieEntity.name = body.name;
    allieEntity.description = body.description;
    allieEntity.imageUrl = body.imageUrl;
    allieEntity.longitude = body.longitude;
    allieEntity.latitude = body.latitude;
    return await this.allieRepository.save(allieEntity);
  }
}
