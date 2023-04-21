import { ApiProperty, getSchemaPath, PartialType } from '@nestjs/swagger';

export class StudentView {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;
}

class Schema {
  @ApiProperty({
    type: 'array',
    items: {
      $ref: getSchemaPath(StudentView),
    },
  })
  students!: StudentView[];
}

export class StudentsView extends PartialType(Schema) {}
