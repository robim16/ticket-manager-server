import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "../../domain/repositories/user.repository";
import { LoginDto } from "../dtos/login.dto";
import * as bcrypt from 'bcrypt';

@Injectable()

export class LoginUseCase {
    constructor(private readonly repo: UserRepository) { }

    async execute(dto: LoginDto) {
        const user = await this.repo.findByEmail(dto.email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return user;
    }
}