import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ListUserDto } from './dto/list-user-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: MongoRepository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const userEntity = new UserEntity();

    Object.assign(userEntity, createUserDto as UserEntity);

    return this.userRepository.save(userEntity);
  }

  async listAllUsers(): Promise<ListUserDto[]> {
    const savedUsers = await this.userRepository.find();

    const listAllUsers = savedUsers.map(
      (user) =>
        new ListUserDto(
          user.id.toString(),
          user.fullName,
          user.birth,
          user.address,
          user.academicEducation,
          user.hardSkills,
          user.softSkills,
        ),
    );

    return listAllUsers;
  }

  async removeUser(id: number) {
    const removedUser = await this.userRepository.delete(id);

    if (!removedUser.affected) {
      throw new NotFoundException('O usuário não foi encontrado!');
    }
  }
}
