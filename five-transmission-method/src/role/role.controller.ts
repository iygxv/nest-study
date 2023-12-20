import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
// import { RoleService } from './role.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CreateRoleDto } from './dto/create-role.dto';
// import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('api/role')
export class RoleController {
  // 注意，这个 find 的路由要放到 :id 的路由前面，
  // 因为 Nest 是从上往下匹配的，如果放在后面，那就匹配到: id 的路由了
  @Get('find')
  query(@Query('name') name: string, @Query('age') age: number) {
    return `received: name=${name},age=${age}`;
  }

  @Get(':id')
  urlParam(@Param('id') id: string) {
    return `received: id=${id}`;
  }

  @Post()
  body(@Body() createRoleDto: CreateRoleDto) {
    return `received: ${JSON.stringify(createRoleDto)}`;
  }

  @Post('file')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: 'uploads/',
    }),
  )
  body2(
    @Body() createPersonDto: CreateRoleDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log(files);
    return `received: ${JSON.stringify(createPersonDto)}`;
  }
}
