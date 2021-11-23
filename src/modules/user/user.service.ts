import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities';
import * as Dto from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async create(body: Dto.CreateDto): Promise<User> {
    let userEntity = new User();
    userEntity.rolId = body.rolId;
    userEntity.suscriptionId = body.suscriptionId;
    userEntity.cityId = body.cityId;
    userEntity.name = body.name;
    userEntity.lastName = body.lastName;
    userEntity.email = body.email;
    userEntity.password = body.password;
    userEntity.phone = body.phone;
    userEntity.gender = body.gender;
    userEntity.latitude = body.latitude;
    userEntity.longitude = body.longitude;
    userEntity.ocupation = body.ocupation;
    userEntity.birthdayAt = body.birthdayAt;
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

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
