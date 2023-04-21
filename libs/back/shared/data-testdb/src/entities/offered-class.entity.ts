import { Entity, Column, ManyToMany, PrimaryColumn } from 'typeorm';

import type { StudentEntity } from './student.entity';

@Entity()
export class OfferedClassEntity {
  @PrimaryColumn()
  code!: number;

  @Column()
  name!: string;

  @Column('int')
  hours!: number;

  @ManyToMany('StudentEntity', 'classes')
  students!: StudentEntity[];
}
