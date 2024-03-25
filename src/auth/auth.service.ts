import { UsersService } from './../users/users.service';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
  
    constructor(private usersService: UsersService,
                private jwtService: JwtService) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
    
        return this.generateToken(user);
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.usersService.getUserByEmail(userDto.email);

        if(candidate) {
            throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST);
        } else {
            const hashPassword = await bcrypt.hash(userDto.password, 5);
            const user = await this.usersService.createUser({...userDto, password: hashPassword})
            return this.generateToken(user);
        }
    }

    private async generateToken(user: User) {
        const payload = {id: user.id, email: user.email, name: user.name};

        return this.jwtService.sign(payload);
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.usersService.getUserByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);

        if(user && passwordEquals) {
            return user;
        }

        throw new UnauthorizedException({message: 'Invalid email or/and password'});
    }
}
