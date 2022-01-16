import { Controller, Post, Get, HttpCode, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { User } from '../../entities/user.entity';

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

  @Get()
  public async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Post('/send-reset-password')
  @HttpCode(200)
  public async sendResetPassword(@Req() req: Request): Promise<String> {
    return await this.userService.sendResetPassword(req.body);
  }

  @Post('/reset-password')
  public async resetPassword(@Req() req: Request): Promise<String> {
    return await this.userService.resetPassword(req.body);
  }
}
