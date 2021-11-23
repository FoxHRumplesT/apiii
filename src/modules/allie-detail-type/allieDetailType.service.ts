import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllieDetailType } from '../../entities';
import * as Dto from './dto';

@Injectable()
export class AllieDetailTypeService {
  constructor(
    @InjectRepository(AllieDetailType)
    private allieDetailTypeRepository: Repository<AllieDetailType>,
  ) {}

  public async create(body: Dto.CreateDto): Promise<AllieDetailType> {
    let allieDetailTypeEntity = new AllieDetailType();
    allieDetailTypeEntity.name = body.name;
    allieDetailTypeEntity.description = body.description;
    return await this.allieDetailTypeRepository.save(allieDetailTypeEntity);
  }

  public async findAll(): Promise<AllieDetailType[]> {
    return await this.allieDetailTypeRepository.find();
  }
}
