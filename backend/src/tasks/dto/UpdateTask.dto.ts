/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

export class UpdateTaskDto{
    @IsString()
    title!:string

    @IsString()
    description!:string

    @IsString()
    status!:string

    @IsString()
    priority!:string

    @IsString()
    deadline!:string
}