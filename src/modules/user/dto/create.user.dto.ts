import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { Role } from 'src/modules/role/entity/role.entity';
import { Status } from 'src/shared/status.enum';
import { ReadUserDetailDto } from '.';

@Exclude()
export class CreateUserDto {
  @Expose()
  @IsString()
  readonly username: string;

  @Expose()
  @IsEmail()
  readonly email: string;

  @Expose()
  @IsString()
  readonly password: string;

  @Expose()
  details: ReadUserDetailDto;

  @Expose()
  roles: Role[];

  @Expose()
  @IsString()
  readonly status: Status[];
}
