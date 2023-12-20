import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局中间件
  // app.use(async (req: Request, res: Response, next: NextFunction) => {
  //   console.log('全局中间件');
  //   console.log('before', req.url);
  //   await next();
  //   console.log('after');
  // });
  await app.listen(3000);
}
bootstrap();
