import { Controller, Post, Get, HttpCode, Req, Res } from '@nestjs/common';
import { Request } from 'express';
import { SuscriptionService } from './suscription.service';
import { Suscription } from '../../entities';

@Controller('/suscription')
export class SuscriptionController {
  constructor(private readonly suscriptionService: SuscriptionService) {}

  @Post()
  @HttpCode(200)
  public async create(@Req() req: Request): Promise<Suscription> {
    return await this.suscriptionService.create(req.body);
  }

  @Get()
  public async findAll(): Promise<Suscription[]> {
    return await this.suscriptionService.findAll();
  }

  @Post('/send-email')
  @HttpCode(200)
  public async sendInscriptionEmail(@Req() req): Promise<String> {
    return await this.suscriptionService.sendInscriptionEmail(req.body);
  }
}
