import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
  UnauthorizedException,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { Public } from './decoractors/public.decorator';
import { AtGuard, RtGuard } from './guards';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ForgetPasswordDto, ResetPasswordDto, CreateAuthDto } from './dto';

interface RequestWithUser extends Request {
  user: {
    sub: number;
    email: string;
    refreshToken: string;
  };
}

@ApiTags('Auth')
@ApiBearerAuth('AccessToken')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @Public()
  SignInLocal(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.SignIn(createAuthDto);
  }

  @Public()
  @UseGuards(AtGuard)
  @Get('signout/:id')
  signOut(@Param('id', ParseIntPipe) id: number) {
    return this.authService.signOut(id);
  }

  @Public()
  @UseGuards(RtGuard)
  @Get('refresh')
  refreshTokens(
    @Query('id', ParseIntPipe) id: number,
    @Req() req: RequestWithUser,
  ) {
    const user = req.user;
    if (user.sub !== id) {
      throw new UnauthorizedException("userId doesn't match");
    }
    return this.authService.refreshTokens(id, user.refreshToken);
  }
  @Public()
  @Post('forget-password')
  @HttpCode(HttpStatus.OK)
  async forgetPassword(
    @Body() forgetPasswordDto: ForgetPasswordDto,
  ): Promise<string | null> {
    return await this.authService.forgetPassword(forgetPasswordDto.email);
  }

  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<void> {
    const { token, newPassword } = resetPasswordDto;
    return await this.authService.resetPassword(token, newPassword);
  }
}
