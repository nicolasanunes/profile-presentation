import { IsEmpty, IsNotEmpty } from '@nestjs/class-validator';

export class CreateUserDto {
  @IsEmpty()
  id: any;

  @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
  fullName: string;

  @IsNotEmpty({ message: 'A data de nascimento não pode ser vazia!' })
  birth: string;

  address: string;

  academicEducation: string;

  hardSkills: string;

  softSkills: string;
}
