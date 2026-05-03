/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { AssignTaskDto } from './dto/AssignTask.dto';
import { CreateTaskDto } from './dto/CreateTaskDto.dto';
import { PatchTaskDto } from './dto/PatchTaskDto.dto';
import { UpdateTaskDto } from './dto/UpdateTask.dto';

@Injectable()
export class TasksService {
    constructor(private readonly db:DbService) {}

    async getAll(){
        return this.db.task.findMany({include:{
            assigned_to:{
                include:{
                    user:true
                }
            },project:true
        }})
    }

    async getOne(id:number){
        return await this.db.task.findUnique({where:{id},include:{
            assigned_to:{
                include:{
                    user:true
                }
            }
        }})
    }
    async createTask(data:CreateTaskDto){
        return await this.db.task.create({
            data
        })
    }

    async updateTask(id:number,data:UpdateTaskDto){
        return await this.db.task.update({where:{id},data})
    }

    async patchTask(id:number,dto:PatchTaskDto){
        const updated = {}
        for (const key in dto){
            if (dto[key]){
                updated[key] = dto[key]
            }
        }
        return await this.db.task.update({where:{id},data:updated})
    }

    async deleteTask(id:number){
        return await this.db.task.delete({where:{id}})
    }


    async assignTask(data:AssignTaskDto){
        return await this.db.userTask.create({
            data
        })
    }


}
