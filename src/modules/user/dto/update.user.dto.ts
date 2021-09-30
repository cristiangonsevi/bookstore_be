import { IsString } from 'class-validator';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class UpdateUserDto {
  @Expose()
  @IsString()
  readonly username: string;
}
