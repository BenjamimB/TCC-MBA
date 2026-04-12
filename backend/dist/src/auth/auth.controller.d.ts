import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: {
        email: string;
        password: string;
        name: string;
    }): Promise<{
        message: string;
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<import("./auth.types").AuthTokens>;
    refresh(body: {
        refreshToken: string;
    }): Promise<import("./auth.types").AuthTokens>;
    logout(body: {
        refreshToken: string;
    }): Promise<void>;
    verifyEmail(body: {
        token: string;
    }): Promise<void>;
    forgotPassword(body: {
        email: string;
    }): Promise<void>;
    resetPassword(body: {
        token: string;
        newPassword: string;
    }): Promise<void>;
}
