import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllieDetailCategoryService } from './allie-detail-category.service';
import { AllieDetailCategoryController } from './allie-detail-category.controller';
import { AllieDetailCategory } from '../../entities';

@Module({
  imports: [TypeOrmModule.forFeature([AllieDetailCategory])],
  providers: [AllieDetailCategoryService],
  controllers: [AllieDetailCategoryController],
})
export class AllieDetailCategoryModule {}
