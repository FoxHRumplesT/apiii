import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllieTypeService } from './allie-type.service';
import { AllieTypeController } from './allie-type.controller';
import { AllieType } from '../../entities';

@Module({
  imports: [TypeOrmModule.forFeature([AllieType])],
  providers: [AllieTypeService],
  controllers: [AllieTypeController],
})
export class AllieTypeModule {}
