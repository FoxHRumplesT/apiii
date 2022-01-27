import { Controller, Get } from '@nestjs/common';
import { Request } from 'express';
import { AllieDetailCategoryService } from './allie-detail-category.service';
import { AllieDetailCategory } from '../../entities';

@Controller('/allie-detail-category')
export class AllieDetailCategoryController {
  constructor(private readonly allieDetailCategoryService: AllieDetailCategoryService) {}

  @Get()
  public async find(): Promise<AllieDetailCategory[]> {
    return await this.allieDetailCategoryService.find();
  }
}
