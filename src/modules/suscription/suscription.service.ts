import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { Suscription } from '../../entities';
import * as Dto from './dto';

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
    suscriptionEntity.value = body.value;
    return await this.suscriptionRepository.save(suscriptionEntity);
  }

  public async findAll(): Promise<Suscription[]> {
    return await this.suscriptionRepository.find();
  }

  public async sendEmail(body: { email: string[] }): Promise<String> {
    const oAuth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI
    );
    oAuth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN
    });
    try {
      const accessToken = await oAuth2Client.getAccessToken();
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'tech@monti.com.es',
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken
        }
      });

      const mailOptions = {
        from: 'Hola <tech@monti.com.es>',
        to: body.email.join(),
        subject: 'Hola',
        text: 'Bienvenido/a a Monti! c:',
        html: '<h1>Bienvenido/a a Monti! c:'
      }
      transport.sendMail(mailOptions);
      return 'Message success';
    } catch (error) {
      console.error('SEND_MESSAGE_ERROR', error);
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Internal server error',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
