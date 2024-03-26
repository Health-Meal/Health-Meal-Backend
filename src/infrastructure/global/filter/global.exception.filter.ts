import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal Server Error';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            message = exception.message;
        } else {
            console.error(exception);
        }

        const responseBody = {
            statusCode: status,
            message: message,
            timestamp: new Date().toISOString(),
            path: request.path
        };

        response.status(status).json(responseBody);
    }
}