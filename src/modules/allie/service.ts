import { CreateAllieDTO } from './dto/create.dto';
import { AllieRepository } from '../../repositories';

export const GetAllies = async () => {
  const create = await AllieRepository.find();
  return create;
}

export const CreateAllies = async (body: CreateAllieDTO) => {
  const create = await AllieRepository.save(body);
  return create;
}
