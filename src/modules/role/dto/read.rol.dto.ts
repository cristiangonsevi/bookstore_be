import { Exclude, Expose } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

@Exclude()
export class ReadRolDto {
  @Expose()
  @IsInt()
  readonly id: number;
  @Expose()
  @IsString()
  readonly name: string;

  @Expose()
  @IsString()
  readonly description: string;

  @Expose()
  @IsString()
  readonly status: string;
}
