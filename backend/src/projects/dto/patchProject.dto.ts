/* eslint-disable prettier/prettier */
import {IsOptional, IsString } from "class-validator";

export class PatchProjectDto{
    @IsString()
    @IsOptional()
    title!:string

    @IsOptional()
    @IsString()
    description!:string

    @IsOptional()
    @IsString()
    priority!:string

    @IsOptional()
    @IsString()
    status!:string

    @IsOptional()
    @IsString()
    deadline!:Date   
}