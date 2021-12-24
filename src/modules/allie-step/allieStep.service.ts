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
      .where('allieStep.allieId = :allieId', { allieId })
      .getMany();
    const returnObject = [];
    await Promise.all(getSteps.map(async (items) => {
      const getDetails = await this.allieDetailService.getDetails(items.id);
      const types = [];
      getDetails.forEach((item) => {
        console.log(item);
        types.push({
          id: item.typeId,
          name: item.name,
          details: {
            id: item.id,
            allieStepId: item.allieStepId,
            allieDetailTypeId: item.allieDetailTypeId,
            name: item.name,
            imageUrl: item.imageUrl
          }
        });
      });
      returnObject.push({
        ...items,
        types: types
      })
    }));
    // const a = getSteps.map((item) => {
    //   const mappedTypes = new Map();
    //   console.log(item);
    //   item.allieDetails.forEach((details) => {
    //     mappedTypes.set(details.allieDetailType.id, {
    //       id: details.id,
    //       name: details.name,
    //       imageUrl: details.imageUrl,
    //       createdAt: details.createdAt,
    //       updatedAt: details.updatedAt
    //     });
    //   });
    //   console.log('mappedTypes', mappedTypes);
    //
    //   return {
    //     id: item.id,
    //     allieId: item.allieId,
    //     name: item.name,
    //     description: item.description,
    //     createdAt: item.createdAt,
    //     updatedAt: item.updatedAt,
    //     types: mappedTypes.get('1')
    //   }
    // });
    return returnObject;
  }
}
