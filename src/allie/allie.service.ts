import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Allie } from '../entities/allie.entity';

@Injectable()
export class AllieService {
  constructor(
    @InjectRepository(Allie)
    private allieRepository: Repository<Allie>,
  ) {}

  findAll(): Promise<Allie[]> {
    return this.allieRepository.find();
  }

  findOne(id: string): Promise<Allie> {
    return this.allieRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.allieRepository.delete(id);
  }
}
