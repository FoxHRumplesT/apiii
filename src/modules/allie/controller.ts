import { Request, Response } from 'express';
import * as Service from './service';

export const GetAllies = async (req: Request, res: Response) => {
  try {
    const data = await Service.GetAllies();
    return res.status(200).send(data);
  } catch (error) {
    console.error('GET_ALLIES_ERROR', error);
    return res.status(500).send(error);
  }
}

export const CreateAllies = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const data = await Service.CreateAllies(body);
    return res.status(200).send(data);
  } catch (error) {
    console.error('CREATE_ALLIES_ERROR', error);
    return res.status(500).send(error);
  }
}
