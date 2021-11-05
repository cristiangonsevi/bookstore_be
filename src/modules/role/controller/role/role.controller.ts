import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleService } from '../../dao/role/role.service';
import { Roles } from '../../decorators/rol.decorator';
import { CreateRolDto, UpdateRolDto } from '../../dto';
import { RoleGuard } from '../../guards/role.guard';

@Controller('roles')
export class RoleController {
  constructor(private readonly _roleService: RoleService) {}

  @Roles('ADMIN')
  @UseGuards(AuthGuard(), RoleGuard)
  @Get(':id')
  async getRol(@Param('id', ParseIntPipe) id: number) {
    return { statusCode: 200, data: await this._roleService.getRol(id) };
  }

  @Roles('ADMIN')
  @UseGuards(AuthGuard(), RoleGuard)
  @Get()
  async getRoles() {
    return { statusCode: 200, data: await this._roleService.getRoles() };
  }

  @Roles('ADMIN')
  @UseGuards(AuthGuard(), RoleGuard)
  @Post()
  @HttpCode(200)
  async createRol(@Body() role: CreateRolDto) {
    return { statusCode: 200, data: await this._roleService.postRole(role) };
  }

  @Roles('ADMIN')
  @UseGuards(AuthGuard(), RoleGuard)
  @Put(':id')
  async updateRol(
    @Param('id', ParseIntPipe) idRole: number,
    @Body() role: UpdateRolDto,
  ) {
    await this._roleService.updateRol(idRole, role);
    return { statusCode: 200, message: 'Record updated' };
  }

  @Roles('ADMIN')
  @UseGuards(AuthGuard(), RoleGuard)
  @Delete(':id')
  async deleteRol(@Param('id', ParseIntPipe) idRole: number) {
    await this._roleService.deleteRol(idRole);
    return { statusCode: 200, message: 'Record deactivated' };
  }
}
