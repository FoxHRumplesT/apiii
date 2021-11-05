import { Injectable } from '@nestjs/common';
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
}
