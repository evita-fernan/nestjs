import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  // ParseIntPipe,
} from '@nestjs/common';

import { UsersService } from '../services/users.service';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dtos';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() payload: CreateUserDto) {
    // return {
    //   message: 'user created',
    // };
    return this.usersService.create(payload);
  }

  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @Get(':userId')
  getOne(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.findOne(userId);
  }

  @Get(':userId/orders')
  getOrder(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.getOrderByUser(userId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return this.usersService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      id,
      message: 'User deleted',
    };
  }
}
