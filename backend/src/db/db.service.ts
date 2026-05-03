/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { OnModuleInit,OnModuleDestroy } from '@nestjs/common';
import 'dotenv/config'
import bcrypt  from 'bcrypt'

@Injectable()
export class DbService 
            extends PrismaClient      
            implements OnModuleInit , OnModuleDestroy{
        constructor(){
            const adapter = new PrismaPg({connectionString:process.env.DATABASE_URL})
            super({adapter})
        }

        async onModuleInit() {
            console.log('Connected')
            await this.$connect()

            const admin = await this.user.findUnique({where:{email:process.env.ADMIN_EMAIL}})
            if (!admin){
                const password = await bcrypt.hash(process.env.ADMIN_PASSWORD,10)
                await this.user.create({
                    data:{
                        username:'Basit Abbas',
                        email:process.env.ADMIN_EMAIL!,
                        password,
                        role:'admin'
                    }
                })
            }
        }
        async onModuleDestroy() {
            console.log('DisConnected')
            await this.$disconnect()
        }
}
