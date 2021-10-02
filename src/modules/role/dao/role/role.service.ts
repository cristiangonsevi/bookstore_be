import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Status } from '../../../../shared/status.enum';
import { ReadRolDto, CreateRolDto, UpdateRolDto } from '../../dto/index';
import { RoleRepository } from '../../entity/role.repository';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
  ) {}

  async getRol(idRole: number): Promise<ReadRolDto> {
    const role: ReadRolDto = await this._roleRepository.findOne(idRole, {
      where: { status: Status.ACTIVE },
    });
    if (!role) throw new NotFoundException();
    return plainToClass(ReadRolDto, role);
  }

  async getRoles(): Promise<ReadRolDto[]> {
    const roles: ReadRolDto[] = await this._roleRepository.find({
      where: { status: Status.ACTIVE },
    });
    return roles.map((role) => plainToClass(ReadRolDto, role));
  }

  async postRole(role: CreateRolDto): Promise<ReadRolDto> {
    const saveRole: CreateRolDto = await this._roleRepository.save(role);
    return plainToClass(ReadRolDto, saveRole);
  }

  async updateRol(idRole: number, role: UpdateRolDto): Promise<void> {
    await this._roleRepository.update(idRole, role);
  }

  async deleteRol(idRole: number): Promise<void> {
    const role: ReadRolDto = await this._roleRepository.findOne(idRole, {
      where: { status: Status.ACTIVE },
    });
    if (!role) throw new NotFoundException();
    await this._roleRepository.update(idRole, { status: Status.INACTIVE });
  }
}
