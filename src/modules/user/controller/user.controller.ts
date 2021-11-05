import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../../role/guards/role.guard';
import { Roles } from '../../role/decorators/rol.decorator';
import { UserService } from '../dao/user.service';
import { UpdateUserDto } from '../dto';
import { User } from '../entity/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Roles('ADMIN')
  @UseGuards(AuthGuard(), RoleGuard)
  @Get()
  async getUsers() {
    return { statusCode: 200, data: await this._userService.getUsers() };
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    return { statusCode: 200, data: await this._userService.getUser(id) };
  }

  @Post()
  @HttpCode(200)
  async createUser(@Body() user: User) {
    await this._userService.createUser(user);
    return { statusCode: 200, message: 'Record created' };
  }

  @Put(':id')
  @HttpCode(200)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ) {
    return {
      statusCode: 200,
      data: await this._userService.updateUser(id, user),
    };
  }
  @Post('/setRole/:userId/:roleId')
  @HttpCode(200)
  async(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number,
  ) {
    this._userService.setRoleToUser(userId, roleId);
    return { statusCode: 200, message: 'Role was asigned successfully' };
  }
}
