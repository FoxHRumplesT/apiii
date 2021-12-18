import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { Suscription } from '../../entities';
import * as Dto from './dto';
import SendEmail from '../utils/mailer/mailer.utils';

@Injectable()
export class SuscriptionService {
  constructor(
    @InjectRepository(Suscription)
    private suscriptionRepository: Repository<Suscription>,
  ) {}

  public async create(body: Dto.CreateDto): Promise<Suscription> {
    let suscriptionEntity = new Suscription();
    suscriptionEntity.name = body.name;
    suscriptionEntity.description = body.description;
    suscriptionEntity.imageUrl = body.imageUrl;
    suscriptionEntity.value = body.value;
    return await this.suscriptionRepository.save(suscriptionEntity);
  }

  public async findAll(): Promise<Suscription[]> {
    return await this.suscriptionRepository.find();
  }

  public async sendInscriptionEmail(body: { email: string[] }): Promise<String> {
    return await SendEmail({
      emails: body.email,
      subject: 'Hola',
      description: 'Bienvenido/a a Monti! c:',
      html: '<h1>Bienvenido/a a Monti! c:</h1>'
    });
  }
}
