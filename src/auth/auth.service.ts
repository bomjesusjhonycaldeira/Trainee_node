import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDto } from './auth.dto';
import { compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { promises } from 'dns';

@Injectable()
export class AuthService {
    private jwtExpTimeInSeconds: number;
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly ConfigService: ConfigService
    ) {
        this.jwtExpTimeInSeconds = +this.ConfigService.get<number>('JWT_EXPIRATION_TIME');
    }

    async singIn(username : string, password: string): Promise<AuthResponseDto> {
        const foundUser = await this.usersService.findByUserName(username);

        if (!foundUser || compareSync(password, foundUser.password)){
            throw new UnauthorizedException();
        }

        const payload = {sub: foundUser.id, username: foundUser.username};

        const token = this.jwtService.sign(payload);

        return { token, expiresIn: this.jwtExpTimeInSeconds }
    }

}
