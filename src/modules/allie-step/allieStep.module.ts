import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllieStepService } from './allieStep.service';
import { AllieStepController } from './allieStep.controller';
import { AllieStep } from '../../entities';

@Module({
  imports: [TypeOrmModule.forFeature([AllieStep])],
  providers: [AllieStepService],
  controllers: [AllieStepController],
})
export class AllieStepModule {}
