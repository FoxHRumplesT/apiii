import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllieMenuService } from './allie-menu.service';
import { AllieMenuController } from './allie-menu.controller';
import { AllieMenu } from '../../entities';

@Module({
  imports: [TypeOrmModule.forFeature([AllieMenu])],
  providers: [AllieMenuService],
  controllers: [AllieMenuController],
})
export class AllieMenuModule {}
