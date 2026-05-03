/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from '../guards/local/local.guard';
import { type Request } from 'express';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService) {}

    @UseGuards(LocalGuard)
    @Post('login')
    login(@Req() req:Request){
        return {'access_token':req.user}
    }

    @Post('register')
    register(@Body() dto:RegisterDto){
        return this.authService.register(dto)
    }
}
