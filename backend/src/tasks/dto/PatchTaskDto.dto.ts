/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from "class-validator";

export class PatchTaskDto{
    @IsString()
    @IsOptional()
    title!:string

    @IsString()
    @IsOptional()
    description!:string

    @IsString()
    @IsOptional()
    status!:string

    @IsString()
    @IsOptional()
    priority!:string

    @IsString()
    @IsOptional()
    deadline!:string
}