import { IsString } from 'class-validator';
import { Status } from '../../../shared/status.enum';

export class UpdateRolDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  status: Status;
}
