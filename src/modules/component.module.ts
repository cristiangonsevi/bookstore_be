import { Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [UserModule, RoleModule],
  providers: [],
})
export class ComponentModule {}
