import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllieDetailTypeService } from './allieDetailType.service';
import { AllieDetailTypeController } from './allieDetailType.controller';
import { AllieDetailType } from '../../entities';

@Module({
  imports: [TypeOrmModule.forFeature([AllieDetailType])],
  providers: [AllieDetailTypeService],
  controllers: [AllieDetailTypeController],
})
export class AllieDetailTypeModule {}
