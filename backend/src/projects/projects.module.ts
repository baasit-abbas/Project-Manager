/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  providers: [ProjectsService],
  controllers: [ProjectsController],
  imports:[DbModule]
})
export class ProjectsModule {}
