import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuscriptionService } from './suscription.service';
import { SuscriptionController } from './suscription.controller';
import { Suscription } from '../../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Suscription])],
  providers: [SuscriptionService],
  controllers: [SuscriptionController],
})
export class SuscriptionModule {}
