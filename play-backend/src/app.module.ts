import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

// export const IS_DEV = process.env.RUNNING_ENV !== 'prod';
// let envFilePath = ''

// if (IS_DEV) {
//   envFilePath = '.env';
// } else {
//   envFilePath = '.env.production';
// }

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/.env'
    }),
   // 数据库连接
   TypeOrmModule.forRootAsync({
    useFactory(configService: ConfigService) {
      return {
        type: "mysql",
        host: configService.get('mysql_server_host'),
        port: configService.get('mysql_server_port'),
        username: configService.get('mysql_server_username'),
        password: configService.get('mysql_server_password'),
        database: configService.get('mysql_server_database'),
        synchronize: true,
        logging: true,
        entities: [
          User
        ],
        poolSize: 10,
        connectorPackage: 'mysql2',
        extra: {
            authPlugin: 'sha256_password',
        }
      }
    },
    inject: [ConfigService]
  }),
  ],
  controllers: [AppController],
  // 全局注入
  providers: [
    AppService
  ],
})
export class AppModule {}
