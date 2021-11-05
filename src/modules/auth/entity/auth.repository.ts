import { Role } from '../../../modules/role/entity/role.entity';
import { RoleRepository } from '../../../modules/role/entity/role.repository';
import { RoleType } from '../../../modules/role/roleType.enum';
import { User } from '../../../modules/user/entity/user.entity';
import { EntityRepository, getConnection, Repository } from 'typeorm';
import { SignUpDto } from '../dto';
import { UserDetail } from '../../../modules/user/entity/user_details.entity';
import { genSalt, hash } from 'bcryptjs';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async signUp(signUpDto: SignUpDto) {
    const { username, email, password } = signUpDto;
    const user = new User();
    user.username = username;
    user.email = email;

    const roleRepository: RoleRepository = await getConnection().getRepository(
      Role,
    );
    const defaultRol: Role = await roleRepository.findOne({
      where: { name: RoleType.GENERAL },
    });
    user.roles = [defaultRol];
    const userDetails = new UserDetail();
    user.details = userDetails;

    const salt = await genSalt(10);

    user.password = await hash(password, salt);
    await user.save();
  }
}
