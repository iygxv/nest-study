import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  // 简写
  // providers: [AppService],
  // 完整写法
  providers: [
    {
      provide: AppService, // 指定 token
      useClass: AppService, // 指定对象的类
    },
  ],
})
export class AppModule {}
