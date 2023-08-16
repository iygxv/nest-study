import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  console.log(__dirname); // 当前文件所在文件夹的绝对路径

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '', 'public'), { prefix: '/static' });
  await app.listen(3000);
}
bootstrap();
