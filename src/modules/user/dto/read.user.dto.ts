/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsEmail, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { ReadUserDetailDto } from './read.user.detail.dto';
import { Status } from 'src/shared/status.enum';
import { ReadRolDto } from 'src/modules/role/dao/read.rol.dto';

@Exclude()
export class ReadUserDto {
  @Expose()
  @IsString()
  readonly id: number;

  @Expose()
  @IsEmail()
  readonly email: string;

  @Expose()
  @IsString()
  readonly username: string;

  @Expose()
  @IsString()
  readonly status: string;

  @Expose()
  @Type((type) => ReadUserDetailDto)
  readonly details: ReadUserDetailDto;

  @Expose()
  @Type((type) => ReadRolDto)
  readonly roles: ReadRolDto[];
}
