import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiResponse, getSchemaPath, ApiExtraModels } from '@nestjs/swagger';
import { StudentsDto } from './commands/create-students.command';

import { StudentService } from './student.service';
import { StudentsView, StudentView } from './views/student.view';

@Controller('students')
export class StudentController {
  constructor(private studentService: StudentService) {
  }

  @ApiTags('students')
  @ApiExtraModels(StudentsView)
  @ApiExtraModels(StudentView)
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(StudentsView) },
  })
  @Get()
  async getStudents(): Promise<StudentsView> {
    return this.studentService.findAllStudents();
  }

  @ApiTags('students')
  @ApiExtraModels(StudentsView)
  @ApiExtraModels(StudentView)
  @ApiResponse({
    status: 201,
    schema: { $ref: getSchemaPath(StudentsView) },
  })
  @Post()
  async postStudents(@Body() students: StudentsDto): Promise<StudentsView> {
    return this.studentService.createStudents(students);
  }
}
