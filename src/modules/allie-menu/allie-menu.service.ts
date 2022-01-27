import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllieMenu } from '../../entities';

@Injectable()
export class AllieMenuService {
  constructor(
    @InjectRepository(AllieMenu)
    private allieMenuRepository: Repository<AllieMenu>,
  ) {}

  public async find(): Promise<AllieMenu[]> {
    return await this.allieMenuRepository.find();
  }
}
