import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllieType } from '../../entities';
import * as Dto from './dto';

@Injectable()
export class AllieTypeService {
  constructor(
    @InjectRepository(AllieType)
    private allieTypeRepository: Repository<AllieType>,
  ) {}

  public async create(body: Dto.CreateDto): Promise<AllieType> {
    let allieEntity = new AllieType();
    allieEntity.name = body.name;
    allieEntity.description = body.description;
    return await this.allieTypeRepository.save(allieEntity);
  }
}
