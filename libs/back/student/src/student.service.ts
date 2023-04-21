import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { StudentsView } from './views/student.view';
import { StudentEntity } from '@demo/back/shared/data-testdb';
import { StudentsDto } from './commands/create-students.command';

@Injectable()
export class StudentService {

  constructor(
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async findAllStudents(): Promise<StudentsView> {
    return this.mapToView(
      await this.dataSource.getRepository(StudentEntity).find()
    );
  }

  async createStudents(batch: StudentsDto): Promise<StudentsView> {
    return this.mapToView(
      await this.dataSource.getRepository(StudentEntity).save(batch.students)
    );
  }

  private mapToView(entities: StudentEntity[]): StudentsView { 
    const students = entities.map(entity => (
      {
        id: String(entity.id),
        name: entity.name
      })
    );
    return { students };
  }

}
