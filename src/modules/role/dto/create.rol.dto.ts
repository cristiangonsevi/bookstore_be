import { IsString } from 'class-validator';
import { Status } from '../../../shared/status.enum';
import { Role } from '../entity/role.entity';

export class CreateRolDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  roles: Role[];

  @IsString()
  status: Status;
}
