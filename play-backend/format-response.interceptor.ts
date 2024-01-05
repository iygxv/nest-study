import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';

// 响应数据格式化

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();
    const code = String(response.statusCode).startsWith('2') ? 200 : response.statusCode
    return next.handle().pipe(map((data) => {
      return {
        code,
        message: 'success',
        data
      }
    }));
  }
}