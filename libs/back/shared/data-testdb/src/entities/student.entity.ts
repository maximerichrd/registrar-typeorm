import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';

import type { OfferedClassEntity } from './offered-class.entity';

@Entity()
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('int')
  entered!: number;

  @Column('int')
  grade!: number;

  @ManyToMany('OfferedClassEntity', 'students')
  @JoinTable()
  classes!: OfferedClassEntity[];
}
