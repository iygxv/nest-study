import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserDto } from './dto/user-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  private logger = new Logger();
  
  @InjectRepository(User)
  private userRepository: Repository<User>;

  async saveUser(user: UserDto) {
    const foundUser = await this.userRepository.findOneBy({
      username: user.username
    });
    if(foundUser) {
      // 修改
      foundUser.ranking = user.ranking;

      try {
        await this.userRepository.save(foundUser);
        return '保存成功';
      } catch(e) {
        this.logger.error(e, UserService);
        return '保存失败';
      }
      
    }else {
      // 添加
      const newUser = new User();
      newUser.username = user.username;
      newUser.ranking = user.ranking;

      try {
        await this.userRepository.save(newUser);
        return '保存成功';
      } catch(e) {
        this.logger.error(e, UserService);
        return '保存失败';
      }
    }
    
  }
  async getUserList() {
    const users = await this.userRepository.find();
    return users.sort((a, b) => b.ranking - a.ranking);
  }
  
}
