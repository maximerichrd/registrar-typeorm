import { Entity, Column, ManyToMany, PrimaryColumn } from "typeorm"
import { StudentEntity } from "./student.entity"

@Entity()
export class OfferedClassEntity {
  @PrimaryColumn()
  code!: number

  @Column()
  name!: string

  @Column("int")
  hours!: number

  @ManyToMany(() => StudentEntity, (student) => student.classes)
  students!: StudentEntity[]
}

