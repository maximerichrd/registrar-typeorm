import { ApiProperty, getSchemaPath, PartialType } from '@nestjs/swagger';

export class OfferedClassView {
  @ApiProperty()
  code!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  hours!: number;
}

class Schema {
  @ApiProperty({
    type: 'array',
    items: {
      $ref: getSchemaPath(OfferedClassView),
    },
  })
  classes!: OfferedClassView[];
}

export class OfferedClassesView extends PartialType(Schema) {}

