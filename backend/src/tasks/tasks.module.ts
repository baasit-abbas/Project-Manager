/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports:[DbModule]
})
export class TasksModule {}
