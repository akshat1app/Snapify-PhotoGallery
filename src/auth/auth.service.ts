import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../user/models/user.model';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { name, email, password} = registerDto;
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({ 
      name: name,
      email: email,
      password: hashed,
      isAdmin: registerDto.isAdmin || false,
    }as any);
    return this.getToken(user);
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.getToken(user);
  }
  

  getToken(user: User) {
    const payload = { sub: user.id, email: user.email, isAdmin: user.isAdmin };
    console.log(user.id);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getProfile(userId: number) {
    return this.userModel.findByPk(userId, { attributes: { exclude: ['password'] } });
  }
}
