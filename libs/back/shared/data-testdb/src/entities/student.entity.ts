import { Entity, Column, ManyToMany, JoinTable, PrimaryGeneratedColumn } from "typeorm"
import { OfferedClassEntity } from "./offered-class.entity"

@Entity()
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column("int")
  entered!: number

  @Column("int")
  grade!: number

  @ManyToMany(() => OfferedClassEntity, (oclass) => oclass.students)
  @JoinTable()
  classes!: OfferedClassEntity[]
}

