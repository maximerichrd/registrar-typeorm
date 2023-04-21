import { StudentEntity } from '@demo/back/shared/data-testdb';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StudentEntity
    ])
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
