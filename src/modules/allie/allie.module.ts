import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllieService } from './allie.service';
import { AllieController } from './allie.controller';
import { Allie } from '../../entities/allie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Allie])],
  providers: [AllieService],
  controllers: [AllieController],
})
export class AllieModule {}
