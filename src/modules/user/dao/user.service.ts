import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Role } from '../../../modules/role/entity/role.entity';
import { getConnection } from 'typeorm';
import { Status } from '../../../shared/status.enum';
import { ReadUserDto, UpdateUserDto } from '../dto';
import { UserRepository } from '../entity/user.repository';
import { UserDetail } from '../entity/user_details.entity';
import { User } from '../entity/user.entity';
import { RoleRepository } from '../../role/entity/role.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
  ) {}

  async getUser(id: number): Promise<ReadUserDto> {
    if (!id) throw new BadRequestException();
    const user: ReadUserDto = await this._userRepository.findOne(id, {
      where: { status: Status.ACTIVE },
    });
    if (!user) throw new NotFoundException();
    // return user;
    return plainToClass(ReadUserDto, user);
  }

  async getUsers(): Promise<ReadUserDto[]> {
    const users: User[] = await this._userRepository.find({
      where: { status: Status.ACTIVE },
    });
    if (!users) throw new NotFoundException();
    return users.map((user) => plainToClass(ReadUserDto, user));
  }

  async createUser(user: User): Promise<ReadUserDto> {
    const details = new UserDetail();
    user.details = details;
    const repo = await getConnection().getRepository(Role);
    const defaultRole = await repo.findOne({ where: { name: 'GENERAL' } });
    user.roles = [defaultRole];
    await this._userRepository.save(user);
    return plainToClass(ReadUserDto, user);
  }

  async updateUser(userId: number, data: UpdateUserDto): Promise<ReadUserDto> {
    const user = await this._userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException();
    user.username = data.username;
    await this._userRepository.save(user);
    return plainToClass(ReadUserDto, user);
  }

  async setRoleToUser(userId: number, rolId: number) {
    const user = await this._userRepository.findOne({
      where: {
        id: userId,
        status: Status.ACTIVE,
      },
    });
    if (!user) throw new NotFoundException();
    const role = await this._roleRepository.findOne({
      where: {
        id: rolId,
        status: Status.ACTIVE,
      },
    });
    if (!role) throw new NotFoundException('Role do not exist');
    user.roles.push(role);
    await this._userRepository.save(user);
    return true;
  }
}
