import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllieDetailService } from './allieDetail.service';
import { AllieDetailController } from './allieDetail.controller';
import { AllieDetail } from '../../entities';

@Module({
  imports: [TypeOrmModule.forFeature([AllieDetail])],
  providers: [AllieDetailService],
  controllers: [AllieDetailController],
  exports: [AllieDetailService]
})
export class AllieDetailModule {}
