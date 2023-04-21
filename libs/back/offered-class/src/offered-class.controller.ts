import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiResponse, getSchemaPath, ApiExtraModels } from '@nestjs/swagger';

import { OfferedClassesDto } from './commands/create-classes.command';
import { OfferedClassService } from './offered-class.service';
import {OfferedClassView, OfferedClassesView} from './views/offered-class.view';

@Controller('offered-classes')
export class OfferedClassController {
  constructor(private offeredClassService: OfferedClassService) {}

  @ApiTags('offered-classes')
  @ApiExtraModels(OfferedClassesView)
  @ApiExtraModels(OfferedClassView)
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(OfferedClassesView) },
  })
  @Get()
  async getStudents(): Promise<OfferedClassesView> {
    return this.offeredClassService.findAllClasses();
  }

  @ApiTags('offered-classes')
  @ApiExtraModels(OfferedClassesView)
  @ApiExtraModels(OfferedClassView)
  @ApiResponse({
    status: 201,
    schema: { $ref: getSchemaPath(OfferedClassesView) },
  })
  @Post()
  async postStudents(@Body() classes: OfferedClassesDto): Promise<OfferedClassesView> {
    return this.offeredClassService.createClasses(classes);
  }

}
