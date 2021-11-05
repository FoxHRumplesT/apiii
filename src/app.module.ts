import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as Modules from './modules';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    Modules.AllieModule,
    Modules.AllieTypeModule,
    Modules.SuscriptionModule,
    Modules.UserModule,
    Modules.RolModule,
    Modules.CountryModule,
    Modules.CityModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
