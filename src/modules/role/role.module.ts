import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { RoleController } from './controller/role/role.controller';
import { RoleService } from './dao/role/role.service';
import { RoleRepository } from './entity/role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoleRepository]), AuthModule],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
