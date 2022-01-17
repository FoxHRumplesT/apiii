import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllieStepService } from './allieStep.service';
import { AllieStepController } from './allieStep.controller';
import { AllieDetailModule } from '../allie-detail/allieDetail.module';
import { AllieStep } from '../../entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([AllieStep]),
    AllieDetailModule
  ],
  providers: [AllieStepService],
  controllers: [AllieStepController],
})
export class AllieStepModule {}
