## Descrição

Projeto em NestJS com TypeScript com o intuito de demonstrar o passo a passo para a conexão com um banco de dados MongoDB criado no Docker. TypeORM utilizado como ORM e Node.js como interpretador do código.

## Criar um container no Docker com o MongoDB

Baixar a imagem do MongoDB
```bash
$ docker pull mongo:latest
```

Criar um servidor especificando uma senha
```bash
$ docker run -d --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=myUser -e MONGO_INITDB_ROOT_PASSWORD=myPasswd mongo:latest
```

Iniciar a instância do MongoDB
```bash
$ docker start containerId
```

## Criação e estruturação do projeto NestJS

Criar o projeto com NestJS
```bash
$ nest new project-name
```

Instalar class-validator
```bash
$ npm i --save @nestjs/class-validator
```

Instalar o TypeORM com o respectivo banco de dados
```bash
$ npm i @nestjs/typeorm typeorm mongodb
```

Instalar o dotenv para permitir o uso do arquivo oculto .env
```bash
$ npm i dotenv
```

Instalar a config para pegar as informações do arquivo .env
```bash
$ npm i @nestjs/config
```

Criar o arquivo .env na raiz do projeto
```bash
DB_HOST=127.0.0.1
DB_PORT=27017
DB_USERNAME=myUser
DB_PASSWORD=myPasswd
DB_NAME=db_name
DB_ADMIN_EMAIL=myEmail
```

Criar o arquivo docker-compose.yaml com as variáveis corretas do respectivo banco de dados na raiz do projeto
```bash
version: '3.1'

services:

 mongodb:
    image: mongo:latest
    container_name: mongodb
    environment:
      - MONGO_INITDB_ROOT_USERNAME=myUser
      - MONGO_INITDB_ROOT_PASSWORD=myPasswd
    volumes:
      - mongodbdata:/data/db
    ports:
      - 27017:27017

volumes:
 mongodbdata:
```

Criar na pasta "/src/db" o arquivo "db.config.service.ts" e configurar o arquivo de acordo com os dados de conexão do banco de dados
```bash
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DbConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mongodb',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      entities: [__dirname + '/../**/*.entity{.js,.ts}'],
    };
  }
}
```

Importar a configuração para "app.module.ts" passando a constante "dbConfigService"
```bash
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfigService } from './db/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: DbConfigService,
      inject: [DbConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

```

## Instalação do projeto

```bash
$ npm install
```

## Rodar a aplicação

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testar a aplicação

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Mantenha contato

- Author - [Nícolas dos Anjos Nunes](https://www.linkedin.com/in/nicolasanunes/)

## Licença

Nest is [MIT licensed](LICENSE).