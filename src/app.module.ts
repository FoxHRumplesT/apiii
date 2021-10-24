import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllieModule } from './allie/allie.module';
import { Allie } from './entities/allie.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    AllieModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
