import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // 声明了 AppService 的依赖，就会自动注入
  // constructor(private readonly appService: AppService) {}
  // 也可以属性注入
  @Inject(AppService)
  private readonly appService: AppService;

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
