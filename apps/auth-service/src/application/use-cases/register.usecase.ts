import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { UserRepository } from "../../domain/repositories/user.repository";
import { RegisterDto } from "../dtos/register.dto";

@Injectable()
export class RegisterUseCase {

    constructor(private readonly repo: UserRepository) {}

    async execute(dto: RegisterDto) {
        const existingUser = await this.repo.findByEmail(dto.email);
        if (existingUser) {
            throw new BadRequestException('email already exists');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const newUser = { ...dto, password: hashedPassword };
        const user = await this.repo.create(newUser);
        return user;
    }

}