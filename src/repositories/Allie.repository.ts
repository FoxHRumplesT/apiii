import { EntityRepository, AbstractRepository } from 'typeorm';
import { Allie } from '../entities';
import { AllieQueryDto } from './dto/allie-query.dto';

@EntityRepository(Allie)
export class AllieRepository extends AbstractRepository<Allie> {
  public save(allie: Allie): Allie {
    return this.repository.save(allie);
  }

  public findAll(query): Promise<Allie[]> {
    return this.repository.find(query);
  }
}
