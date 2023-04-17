import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { GoogleAuthGuard } from './auth/guards/google-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req) {
    console.log(req.user);
    return req.user;
  }
}
