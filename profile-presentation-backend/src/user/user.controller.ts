import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { ListUserDto } from './dto/list-user-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptionsAvatar } from 'src/middlewares/upload-avatar.middleware';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(FileInterceptor('avatar', multerOptionsAvatar))
  async createUser(
    @UploadedFile() avatar: Express.Multer.File,
    @Body() createUserDto: CreateUserDto,
  ) {
    createUserDto.avatar = avatar.filename;
    const createdUser = await this.userService.createUser(createUserDto);

    return {
      user: new ListUserDto(
        createdUser.id,
        createdUser.avatar,
        createdUser.fullName,
        createdUser.birth,
        createdUser.address,
        createdUser.academicEducation,
        createdUser.hardSkills,
        createdUser.softSkills,
      ),
      message: 'Usuário criado!',
    };
  }

  @Get()
  async listAllUsers(): Promise<ListUserDto[]> {
    const savedUsers = await this.userService.listAllUsers();

    return savedUsers;
  }

  @Get(':imageName')
  async getImage(@Param('imageName') imageName: string, @Res() res: any) {
    if (imageName !== null) {
      const imagePath = `./public/uploads/${imageName}`;
      res.sendFile(imagePath);
    }
  }

  @Delete(':id')
  async removeUser(@Param('id') id: number) {
    await this.userService.removeUser(id);

    return {
      message: 'Usuário removido!',
    };
  }
}
