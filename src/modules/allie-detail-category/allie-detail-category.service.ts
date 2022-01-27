import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllieDetailCategory } from '../../entities';

@Injectable()
export class AllieDetailCategoryService {
  constructor(
    @InjectRepository(AllieDetailCategory)
    private allieDetailCategoryRepository: Repository<AllieDetailCategory>,
  ) {}

  public async find(): Promise<AllieDetailCategory[]> {
    return await this.allieDetailCategoryRepository.find();
  }
}
