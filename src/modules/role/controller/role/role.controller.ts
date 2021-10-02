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
} from '@nestjs/common';
import { RoleService } from '../../dao/role/role.service';
import { CreateRolDto, UpdateRolDto } from '../../dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly _roleService: RoleService) {}

  @Get(':id')
  async getRol(@Param('id', ParseIntPipe) id: number) {
    return { statusCode: 200, data: await this._roleService.getRol(id) };
  }

  @Get()
  async getRoles() {
    return { statusCode: 200, data: await this._roleService.getRoles() };
  }

  @Post()
  @HttpCode(200)
  async createRol(@Body() role: CreateRolDto) {
    return { statusCode: 200, data: await this._roleService.postRole(role) };
  }

  @Put(':id')
  async updateRol(
    @Param('id', ParseIntPipe) idRole: number,
    @Body() role: UpdateRolDto,
  ) {
    await this._roleService.updateRol(idRole, role);
    return { statusCode: 200, message: 'Record updated' };
  }

  @Delete(':id')
  async deleteRol(@Param('id', ParseIntPipe) idRole: number) {
    await this._roleService.deleteRol(idRole);
    return { statusCode: 200, message: 'Record deactivated' };
  }
}
