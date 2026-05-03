/* eslint-disable prettier/prettier */
import {IsString } from "class-validator";

export class CreateProjectDto{
    @IsString()
    title!:string

    @IsString()
    description!:string

    @IsString()
    priority!:string

    @IsString()
    deadline!:Date
}