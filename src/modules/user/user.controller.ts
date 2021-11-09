import { Controller, Post, Get, HttpCode, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { User } from '../../entities';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(200)
  public async create(@Req() req: Request): Promise<User> {
    return await this.userService.create(req.body);
  }

  @Post('/login')
  @HttpCode(200)
  public async login(@Req() req: Request): Promise<User> {
    return await this.userService.login(req.body);
  }
}
