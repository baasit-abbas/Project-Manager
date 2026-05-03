/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/server/guards/jwt/jwt.guard';
import { Roles } from 'src/server/guards/roles/roles.decorator';
import { Role } from 'src/server/guards/roles/roles.enum';
import { RolesGuard } from 'src/server/guards/roles/roles.guard';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/UpdateUserDto.dto';


@UseGuards(JwtGuard,RolesGuard)
@Roles(Role.ADMIN)
@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService) {}

    @Get()
    getall(){
        return this.userService.getallUser()
    }

    @Roles(Role.USER,Role.ADMIN)
    @Get(':id')
    getone(@Param('id') id:string){
        return this.userService.getUserById(Number(id))
    }

    
    @Patch(':id')
    updateUser(@Param('id') id:string,@Body() dto:UpdateUserDto){
        return this.userService.updateUser(Number(id),dto)
    }

    @Delete(':id')
    delete(@Param('id') id:string){
        return this.userService.deleteUser(Number(id))
    }
}
