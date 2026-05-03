/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/createProject.dto';
import { PatchProjectDto } from './dto/patchProject.dto';
import { JwtGuard } from 'src/server/guards/jwt/jwt.guard';
import { RolesGuard } from 'src/server/guards/roles/roles.guard';
import { Roles } from 'src/server/guards/roles/roles.decorator';
import { Role } from 'src/server/guards/roles/roles.enum';
import { UpdateProjectDto } from './dto/UpdateProject.dto';


@UseGuards(JwtGuard,RolesGuard)
@Roles(Role.ADMIN)
@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService:ProjectsService) {}

    @Get()
    getAll(){
        return this.projectsService.getAll()
    }

    @Get(':id')
    getOne(@Param('id') id:string){
        return this.projectsService.getOne(Number(id))
    }

    @Post()
    create(@Body() dto:CreateProjectDto){
        return this.projectsService.create(dto)
    }

    @Put(':id')
    update(@Param('id') id:string , @Body() dto:UpdateProjectDto){
        return this.projectsService.update(Number(id),dto)
    }

    @Patch(':id')
    patch(@Param('id') id:string , @Body() dto:PatchProjectDto){
        return this.projectsService.patch(Number(id),dto)
    }

    @Delete(':id')
    deleteProject(@Param('id') id:string){
        return this.projectsService.delete(Number(id))
    }
}
