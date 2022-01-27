import { Controller, Get } from '@nestjs/common';
import { Request } from 'express';
import { AllieMenuService } from './allie-menu.service';
import { AllieMenu } from '../../entities';

@Controller('/allie-menu')
export class AllieMenuController {
  constructor(private readonly allieMenuService: AllieMenuService) {}

  @Get()
  public async find(): Promise<AllieMenu[]> {
    return await this.allieMenuService.find();
  }
}
