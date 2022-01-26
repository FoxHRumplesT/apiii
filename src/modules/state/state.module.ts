import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { State } from '../../entities';

@Module({
  imports: [TypeOrmModule.forFeature([State])],
  providers: [StateService],
  controllers: [StateController],
})
export class StateModule {}
