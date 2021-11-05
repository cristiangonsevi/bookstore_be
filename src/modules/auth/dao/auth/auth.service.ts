import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { RoleType } from '../../../../modules/role/roleType.enum';
import { SignInDto, SignUpDto } from '../../dto';
import { AuthRepository } from '../../entity/auth.repository';
import { IJwtPayload } from '../../jwt-token.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
    private readonly _jwtService: JwtService,
  ) {}

  async singUp(signUp: SignUpDto): Promise<void> {
    const { username, email } = signUp;
    const user = await this._authRepository.findOne({
      where: [{ username }, { email }],
    });
    if (user) throw new ConflictException('username or email already exist');
    return this._authRepository.signUp(signUp);
  }
  async signIn(signIn: SignInDto): Promise<{ token: string }> {
    const { username, password } = signIn;
    const user = await this._authRepository.findOne({
      where: {
        username,
      },
    });
    if (!user) throw new NotFoundException('username do not exist');
    const passMatch = await compare(password, user.password);
    if (!passMatch) throw new NotFoundException('Invalid credentials');
    const payload: IJwtPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      roles: user.roles.map((role) => role.name as RoleType),
    };
    const token = await this._jwtService.sign(payload);
    return { token };
  }
}
