/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { UpdateUserDto } from './dto/UpdateUserDto.dto';
@Injectable()
export class UserService {
    constructor(private readonly db:DbService) {}


    async getallUser(){
        return this.db.user.findMany({})
    }

    async getUserById(id:number){
        return this.db.user.findUnique({where:{id},include:{
            tasks:{
                include:{
                    task:true
                }
            }
        }})
    }

    async updateUser(id:number,dto:UpdateUserDto){
        const updateData = {}
        for (const key in dto){
            if (dto[key]){
                updateData[key] = dto[key]
            }
        }
        return await this.db.user.update({where:{id},data:updateData})
    }

    async deleteUser (id:number){
        return await this.db.user.delete({where:{id}})
    }
}
