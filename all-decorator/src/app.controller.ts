import { Controller, Get, HttpException, HttpStatus, Inject, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { TestFilter } from './test.filter';

@Controller()
export class AppController {
  // 构造器注入
  // constructor(private readonly appService: AppService) {}

  // 属性注入
  @Inject(AppService) // 属性注入指定注入的 token，可能是 class 也可能是 string
  private readonly appService: AppService

  @Get()
  @UseFilters(TestFilter)
  getHello(): string {
    throw new  HttpException('网络错误', HttpStatus.BAD_REQUEST)
    return this.appService.getHello();
  }
}
