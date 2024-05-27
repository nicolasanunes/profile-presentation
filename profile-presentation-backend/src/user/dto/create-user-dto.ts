import { IsEmpty, IsNotEmpty } from '@nestjs/class-validator';

export class CreateUserDto {
  @IsEmpty()
  id: any;

  @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
  fullName: string;

  @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
  birth: string;

  @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
  address: string;

  academicEducation: string;

  hardSkills: string;

  softSkills: string;
}
