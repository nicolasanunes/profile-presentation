import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  fullName: string;

  @Column()
  birth: string;

  @Column()
  address: string;

  @Column()
  academicEducation: string;

  @Column()
  hardSkills: string;

  @Column()
  softSkills: string;
}
