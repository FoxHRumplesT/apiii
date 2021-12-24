import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllieDetail } from '../../entities';
import * as Dto from './dto';

@Injectable()
export class AllieDetailService {
  constructor(
    @InjectRepository(AllieDetail)
    private allieDetailRepository: Repository<AllieDetail>,
  ) {}

  public async create(body: Dto.CreateDto): Promise<AllieDetail> {
    let allieDetailEntity = new AllieDetail();
    allieDetailEntity.allieStepId = body.allieStepId;
    allieDetailEntity.allieDetailTypeId = body.allieDetailTypeId;
    allieDetailEntity.name = body.name;
    allieDetailEntity.imageUrl = body.imageUrl;
    return await this.allieDetailRepository.save(allieDetailEntity);
  }

  public async findAll(): Promise<AllieDetail[]> {
    return await this.allieDetailRepository.find();
  }

  public async getDetails(allieStepId: number): Promise<any[]> {
    return await this.allieDetailRepository.createQueryBuilder('allieDetail')
      .select('"allieDetail".*, allieDetailType.id as typeId, allieDetailType.name as "typeName"')
      .innerJoin('allieDetail.allieDetailType', 'allieDetailType')
      .where('allieDetail.allieStepId = :allieStepId', { allieStepId })
      .execute();
  }
}
