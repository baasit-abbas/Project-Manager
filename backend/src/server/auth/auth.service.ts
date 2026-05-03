/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import bcrypt  from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly db:DbService , private readonly jwt:JwtService){}

    async register(dto:RegisterDto){
        const data = {...dto,role:'user'}
        const {password} = data
        const hashedPassowrd = await bcrypt.hash(password,10)
        return await this.db.user.create({
            data:{
                ...data,password:hashedPassowrd
            }
        })
    }
    async login(dto:LoginDto){
        const user = await this.db.user.findUnique({where:{email:dto.email}})
        if (!user) return null
        const isValid = await bcrypt.compare(dto.password,user.password)
        if (!isValid) return null
        const {password,...data} = user
        return this.jwt.sign(data)
    }
}
