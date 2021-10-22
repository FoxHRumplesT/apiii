import { Request, Response } from 'express';
import * as Service from './service';

export const GetUser = (req: Request, res: Response) => {
  try {
    return res.status(200).send(Service.GetUser());
  } catch (error) {
    console.error('GET_USER_ERROR', error);
    return res.status(500).send(error);
  }
}
