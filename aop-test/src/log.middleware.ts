import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

// 路由中间件
@Injectable()
export class LogMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('before2', req.url);

    next();

    console.log('after2');
  }
}
