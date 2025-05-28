import { Injectable } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    console.log(
      `[\x1b[33m${new Date().toISOString()}\x1b[0m] \x1b[32m${req.method}\x1b[0m ${req.path}`,
    );

    const originalEnd = res.end.bind(res) as Response['end'];

    res.end = function (...args: Parameters<Response['end']>): Response {
      const duration = Date.now() - start;
      console.log(
        `[\x1b[33m${new Date().toISOString()}\x1b[0m] \x1b[32m${req.method}\x1b[0m ${req.statusCode} - \x1b[34m${duration}ms\x1b[0m`,
      );

      return originalEnd.apply(res, args) as Response;
    } as Response['end'];

    next();
  }
}
