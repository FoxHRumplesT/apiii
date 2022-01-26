import { Controller, Get } from '@nestjs/common';
import { Request } from 'express';
import { StateService } from './state.service';
import { State } from '../../entities';

@Controller('/state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  public async find(): Promise<State[]> {
    return await this.stateService.find();
  }
}
