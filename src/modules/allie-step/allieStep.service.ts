import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllieStep } from '../../entities';
import { AllieDetailService } from '../allie-detail/allieDetail.service';
import * as Dto from './dto';

@Injectable()
export class AllieStepService {
  constructor(
    @InjectRepository(AllieStep)
    private allieStepRepository: Repository<AllieStep>,
    private allieDetailService: AllieDetailService
  ) {}

  public async create(body: Dto.CreateDto): Promise<AllieStep> {
    let allieStepEntity = new AllieStep();
    allieStepEntity.allieId = body.allieId;
    allieStepEntity.name = body.name;
    allieStepEntity.description = body.description;
    return await this.allieStepRepository.save(allieStepEntity);
  }

  public async findById(allieId: number): Promise<any[]> {
    const getSteps = await this.allieStepRepository.createQueryBuilder('allieStep')
      .innerJoinAndSelect('allieStep.allieDetails', 'allieDetails')
      .innerJoinAndSelect('allieDetails.allieDetailType', 'allieDetailType')
      .where('allieStep.allieId = :allieId', { allieId })
      .andWhere('allieStep.deletedAt IS NULL')
      .andWhere('allieDetails.deletedAt IS NULL')
      .andWhere('allieDetailType.deletedAt IS NULL')
      .getMany();
    return getSteps.map((item) => {
      const mappedTypes = new Map();
      const types = [];
      const allieDetails = [];

      item.allieDetails.forEach((detail) => {
        allieDetails.push({
          id: detail.id,
          allieStepId: detail.allieStepId,
          allieDetailTypeId: detail.allieDetailTypeId,
          name: detail.name,
          imageUrl: detail.imageUrl,
        })
        mappedTypes.set(detail.allieDetailType.id, detail.allieDetailType);
      });
      mappedTypes.forEach((val, key) => {
        const details = allieDetails.filter((search) => String(search.allieDetailTypeId) === String(key));
        types.push({
          id: key,
          name: val.name,
          details
        });
      });
      return {
        id: item.id,
        allieId: item.allieId,
        name: item.name,
        description: item.description,
        types
      }
    });
  }
}
