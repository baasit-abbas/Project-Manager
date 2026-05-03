/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/CreateTaskDto.dto';
import { AssignTaskDto } from './dto/AssignTask.dto';
import { JwtGuard } from 'src/server/guards/jwt/jwt.guard';
import { RolesGuard } from 'src/server/guards/roles/roles.guard';
import { Role } from 'src/server/guards/roles/roles.enum';
import { Roles } from 'src/server/guards/roles/roles.decorator';
import { PatchTaskDto } from './dto/PatchTaskDto.dto';
import { UpdateTaskDto } from './dto/UpdateTask.dto';

@UseGuards(JwtGuard,RolesGuard)
@Roles(Role.ADMIN)
@Controller('tasks')
export class TasksController {

    constructor (private readonly tasksService:TasksService) {}

    @Get()
    getAll(){
        return this.tasksService.getAll()
    }

    @Roles(Role.USER,Role.ADMIN)
    @Get(':id')
    getone(@Param('id') id:string){
        return this.tasksService.getOne(Number(id))
    }

    @Post()
    create(@Body() dto:CreateTaskDto){
        return this.tasksService.createTask(dto)
    }

    @Put(':id')
    update(@Param('id') id:string , @Body() dto:UpdateTaskDto){
        return this.tasksService.updateTask(Number(id),dto)
    }
    @Roles(Role.USER,Role.ADMIN)
    @Patch(':id')
    patch(@Param('id') id:string , @Body() dto:PatchTaskDto){
        return this.tasksService.patchTask(Number(id),dto)
    }

    @Delete(':id')
    deletetask(@Param('id') id:string){
        return this.tasksService.deleteTask(Number(id))
    }

    @Post('assign')
    assignTask(@Body() dto:AssignTaskDto){
        return this.tasksService.assignTask(dto)
    }

}
