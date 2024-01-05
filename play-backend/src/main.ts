import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { FormatResponseInterceptor } from 'format-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalInterceptors(new FormatResponseInterceptor())
  console.log(process.env.NODE_ENV);
  
  const configService = app.get(ConfigService)
  const port = configService.get('nest_server_port')
  await app.listen(port);
}
bootstrap();
