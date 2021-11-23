import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllieStep } from '../../entities';
import * as Dto from './dto';

@Injectable()
export class AllieStepService {
  constructor(
    @InjectRepository(AllieStep)
    private allieStepRepository: Repository<AllieStep>,
  ) {}

  public async create(body: Dto.CreateDto): Promise<AllieStep> {
    let allieStepEntity = new AllieStep();
    allieStepEntity.allieId = body.allieId;
    allieStepEntity.name = body.name;
    allieStepEntity.description = body.description;
    return await this.allieStepRepository.save(allieStepEntity);
  }

  public async findById(allieId: number): Promise<AllieStep[]> {
    return await this.allieStepRepository.createQueryBuilder('allieStep')
      .innerJoinAndSelect('allieStep.allieDetails', 'allieDetails')
      .where('allieStep.allieId = :allieId', { allieId })
      .getMany();
  }
}
