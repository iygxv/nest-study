import { Module, OnModuleInit, OnApplicationBootstrap } from '@nestjs/common';
import { CccService } from './ccc.service';
import { CccController } from './ccc.controller';

@Module({
  controllers: [CccController],
  providers: [CccService],
})
export class CccModule implements OnModuleInit, OnApplicationBootstrap {
  onModuleInit() {
    console.log('ccc modules init === onModuleInit');
  }

  onApplicationBootstrap() {
    console.log('ccc modules init === onApplicationBootstrap');
  }

}
