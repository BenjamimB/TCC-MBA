import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string; name: string }) {
    const result = await this.authService.register(body.email, body.password, body.name);
    if (!result.ok) throw Object.assign(new Error(result.error.code), { status: 422, error: result.error });
    return { message: 'Verifique seu e-mail para ativar a conta.' };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: { email: string; password: string }) {
    const result = await this.authService.login(body.email, body.password);
    if (!result.ok) {
      const status = result.error.code === 'RATE_LIMITED' ? 429 : 401;
      throw Object.assign(new Error(result.error.code), { status, error: result.error });
    }
    return result.value;
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() body: { refreshToken: string }) {
    const result = await this.authService.refresh(body.refreshToken);
    if (!result.ok) throw Object.assign(new Error(result.error.code), { status: 401, error: result.error });
    return result.value;
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Body() body: { refreshToken: string }) {
    await this.authService.logout(body.refreshToken);
  }

  @Post('verify-email')
  @HttpCode(HttpStatus.NO_CONTENT)
  async verifyEmail(@Body() body: { token: string }) {
    const result = await this.authService.verifyEmail(body.token);
    if (!result.ok) throw Object.assign(new Error(result.error.code), { status: 400, error: result.error });
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async forgotPassword(@Body() body: { email: string }) {
    await this.authService.requestPasswordReset(body.email);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async resetPassword(@Body() body: { token: string; newPassword: string }) {
    const result = await this.authService.resetPassword(body.token, body.newPassword);
    if (!result.ok) throw Object.assign(new Error(result.error.code), { status: 400, error: result.error });
  }
}
