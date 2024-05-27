import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfigService } from './db/db.config.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { UserEntity } from './user/entities/user.entity';
@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([UserEntity]),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: DbConfigService,
      inject: [DbConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
