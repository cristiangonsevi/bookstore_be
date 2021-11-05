import { Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [UserModule, RoleModule, AuthModule],
  providers: [],
})
export class ComponentModule {}
