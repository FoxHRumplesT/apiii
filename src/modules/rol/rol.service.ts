import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from '../../entities/rol.entity';
import * as Dto from './dto';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>,
  ) {}

  public async create(body: Dto.CreateDto): Promise<Rol> {
    let rolEntity = new Rol();
    rolEntity.name = body.name;
    rolEntity.description = body.description;
    return await this.rolRepository.save(rolEntity);
  }
}
