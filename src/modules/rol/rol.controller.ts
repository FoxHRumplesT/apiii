import { Controller, Post, Get, HttpCode, Req } from '@nestjs/common';
import { Request } from 'express';
import { RolService } from './rol.service';
import { Rol } from '../../entities/rol.entity';

@Controller('/rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Post()
  @HttpCode(200)
  public async create(@Req() req: Request): Promise<Rol> {
    return await this.rolService.create(req.body);
  }
}
