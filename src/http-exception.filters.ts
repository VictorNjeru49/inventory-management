import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { LogsService } from './logs/logs.service';
import { Request, Response } from 'express';

export interface MyResponseObj {
  statusCode: number;
  timeStap: string;
  path: string;
  response: string | object;
}

@Catch()
export class ALLExceptionsFilter extends BaseExceptionFilter {
  private readonly logs = new LogsService();

  private getClientIp(request: Request): string {
    const fowardedFor = request.headers['x-fowarded-for'];
    if (fowardedFor) {
      return Array.isArray(fowardedFor)
        ? fowardedFor[0]
        : fowardedFor.split(',')[0].trim();
    }
    return request.ip || 'unknown';
  }
  override catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const clientIp = this.getClientIp(request);

    const myResponseObj: MyResponseObj = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timeStap: new Date().toISOString(),
      path: request.url,
      response: '',
    };

    if (exception instanceof HttpException) {
      myResponseObj.statusCode = exception.getStatus();
      myResponseObj.response = exception.getResponse();
    } else if (exception instanceof Error) {
      myResponseObj.response = exception.message;
    } else {
      myResponseObj.response = `Internal Server Error`;
    }

    response.status(myResponseObj.statusCode).json(myResponseObj);

    const logMessage =
      typeof myResponseObj.response === 'string'
        ? myResponseObj.response
        : JSON.stringify(myResponseObj.response);
    void this.logs.logToFile(
      `ERROR: ${logMessage} - Path: ${request.url}`,
      clientIp,
    );
  }
}
