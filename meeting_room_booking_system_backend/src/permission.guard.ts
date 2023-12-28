import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
// 标记 PermissionGuard 类为可注入的
export class PermissionGuard implements CanActivate {
  // 创建名为 PermissionGuard 的类，并实现 CanActivate 接口

  @Inject(Reflector)
  // 使用 @Inject() 装饰器将 Reflector 注入到 PermissionGuard 类中
  private reflector: Reflector;
  // 创建私有属性 reflector，并指定其类型为 Reflector

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    // 声明异步函数 canActivate，并接收一个 ExecutionContext 类型的参数，返回一个 Promise<boolean> 类型的值

    // 获取请求对象 request，这里假设使用 Express 框架，通过 context.switchToHttp().getRequest() 获取当前请求对象
    const request: Request = context.switchToHttp().getRequest();

    // 如果请求中没有用户信息，则直接返回 true，允许访问
    if(!request.user) {
      return true;
    }

    // 获取请求中用户的权限列表
    const permissions = request.user.permissions;
    console.log('permissions:', permissions)

    // 获取所需的权限列表，通过 reflector.getAllAndOverride 方法从类和处理函数中获取带有 require-permission 元数据的注解
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>('require-permission', [
      context.getClass(),
      context.getHandler()
    ])
    console.log('requiredPermissions:', requiredPermissions)
    // 如果没有所需权限，则直接返回 true，允许访问
    if(!requiredPermissions) {
      return true;
    }
  
    // 遍历所需权限列表
    for(let i = 0; i < requiredPermissions.length; i++) {

      // 获取当前权限
      const curPermission = requiredPermissions[i];

      // 在用户权限列表中查找当前权限
      const found = permissions.find(item => item.code === curPermission);

      // 如果没有找到相应的权限，抛出 UnauthorizedException 异常
      if(!found) {
        throw new UnauthorizedException('您没有访问该接口的权限');
      }
    }

    // 如果所有权限校验通过，则返回 true，允许访问
    return true;
  }
}