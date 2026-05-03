/* eslint-disable prettier/prettier */
import {IsString } from "class-validator";

export class UpdateProjectDto{
    @IsString()
    title!:string

    @IsString()
    description!:string

    @IsString()
    priority!:string

    @IsString()
    deadline!:Date

    @IsString()
    status!:string
}