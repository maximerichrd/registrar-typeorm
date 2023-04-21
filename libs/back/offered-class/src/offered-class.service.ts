import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { OfferedClassesView } from './views/offered-class.view';
import { OfferedClassEntity } from '@demo/back/shared/data-testdb';
import { OfferedClassesDto } from './commands/create-classes.command';

@Injectable()
export class OfferedClassService {

  constructor(
    @InjectDataSource() private dataSource: DataSource,
  ) {}


  async findAllClasses(): Promise<OfferedClassesView> {
    return this.mapToView(
      await this.dataSource.getRepository(OfferedClassEntity).find()
    );
  }

  async createClasses(batch: OfferedClassesDto): Promise<OfferedClassesView> {
    return this.mapToView(
      await this.dataSource.getRepository(OfferedClassEntity).save(batch.classes)
    );
  }

  private mapToView(entities: OfferedClassEntity[]): OfferedClassesView { 
    const classes = entities.map(entity => (
      {
        code: String(entity.code),
        name: entity.name,
        hours: entity.hours
      })
    );
    return { classes };
  }

}
