import { IsString } from 'class-validator';

export class CreateRolDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
