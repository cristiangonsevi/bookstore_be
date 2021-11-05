import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../../dao/auth/auth.service';
import { SignInDto, SignUpDto } from '../../dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('/singup')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async singUp(@Body() signUp: SignUpDto): Promise<any> {
    await this._authService.singUp(signUp);
    return { statusCode: 200, messsage: 'User created successfully' };
  }

  @Post('/singin')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async singIn(
    @Body() singIn: SignInDto,
  ): Promise<{ statusCode: number; data: { token: string } }> {
    return { statusCode: 200, data: await this._authService.signIn(singIn) };
  }
}
