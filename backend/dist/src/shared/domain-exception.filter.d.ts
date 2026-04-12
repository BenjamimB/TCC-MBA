import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export declare class DomainExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void;
}
