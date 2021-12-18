import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities';
import * as Dto from './dto';
import SendEmail from '../utils/mailer/mailer.utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async create(body: Dto.CreateDto): Promise<User> {
    let userEntity = new User();
    userEntity.rolId = 1;
    userEntity.suscriptionId = body.suscriptionId;
    userEntity.name = body.name;
    userEntity.lastName = body.lastName;
    userEntity.email = body.email;
    userEntity.password = body.password;
    userEntity.indicator = body.indicator;
    userEntity.phone = body.phone;
    userEntity.latitude = body.latitude;
    userEntity.longitude = body.longitude;
    return await this.userRepository.save(userEntity);
  }

  public async login(body: Dto.LoginDto): Promise<User> {
    try {
      if (!body.email || !body.password) throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Usuario y/o contraseña invalido',
      }, HttpStatus.BAD_REQUEST);
      const getUser = await this.userRepository.findOne({
        email: body.email,
        password: body.password
      });
      if (getUser) {
        return getUser;
      } else {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: 'Usuario y/o contraseña invalido',
        }, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      console.error('LOGIN_ERROR', error);
      throw new HttpException({
        status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error || 'Internal server error',
      }, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async sendResetPassword(body: { email: string }): Promise<String> {
    try {
      let findUser = await this.userRepository.findOne({
        email: body.email
      });
      findUser.resetPasswordUuid = uuidv4();
      const saveUser = await this.userRepository.save(findUser);
      return await SendEmail({
        emails: [body.email],
        subject: 'Recupearción de contraseña',
        description: `http://localhost:3000/password-recovery/${saveUser.resetPasswordUuid}`,
        html: `<h1>http://localhost:3000/password-recovery/${saveUser.resetPasswordUuid}</h1>`
      });
    } catch (error) {
      console.error('SEND_RESET_PASSWORD_ERROR', error);
      throw new HttpException({
        status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error || 'Internal server error',
      }, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async resetPassword(body: Dto.ResetPasswordDto): Promise<String> {
    try {
      let findUser = await this.userRepository.findOne({
        resetPasswordUuid: body.token
      });
      findUser.password = body.password;
      const saveUser = await this.userRepository.save(findUser);
      return 'Password reset successfully';
    } catch (error) {
      console.error('RESET_PASSWORD_ERROR', error);
      throw new HttpException({
        status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error || 'Internal server error',
      }, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
