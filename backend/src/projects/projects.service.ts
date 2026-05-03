/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateProjectDto } from './dto/createProject.dto';
import { PatchProjectDto } from './dto/patchProject.dto';
import { UpdateProjectDto } from './dto/UpdateProject.dto';

@Injectable()
export class ProjectsService {
    constructor(private readonly db:DbService) {}

    async getAll(){
        return await this.db.project.findMany({})
    }

    async getOne(id:number){
        return await this.db.project.findUnique({where:{id},include:{
            tasks:true
        }})
    }

    async create(data:CreateProjectDto){
        return await this.db.project.create({
            data
        })
    }

    async update(id:number,data:UpdateProjectDto){
        return await this.db.project.update({where:{id},data})
    }
    async patch(id:number,dto:PatchProjectDto){
        const updated = {}
        for (const key in dto){
            if (dto[key]){
                updated[key] = dto[key]
            }
        }
        return await this.db.project.update({where:{id},data:updated})
    }

    async delete(id:number){
        return await this.db.project.delete({where:{id}})
    }
}
