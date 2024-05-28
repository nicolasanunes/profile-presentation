export class ListUserDto {
  constructor(
    readonly id: string,
    readonly avatar: string,
    readonly fullName: string,
    readonly birth: string,
    readonly address: string,
    readonly academicEducation: string,
    readonly hardSkills: string,
    readonly softSkills: string,
  ) {}
}
