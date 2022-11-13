import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guards';
import { LocalAuthGuard } from './auth/local/local-auth.guards';

@Controller()
export class AppController {
  
}