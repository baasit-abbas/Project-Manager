/* eslint-disable prettier/prettier */
import { IsInt, IsString } from "class-validator";

export class CreateTaskDto{
    @IsString()
    title!:string

    @IsString()
    description!:string
    
    @IsInt()
    project_id!:number

    @IsString()
    priority!:string

    @IsString()
    deadline!:Date
}