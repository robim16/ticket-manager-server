import { Injectable } from "@nestjs/common";
import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()
export class UserRepositoryImpl implements UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>
    ) { }

    create(data: { name: string; email: string; username: string; password: string; }): Promise<User> {
        const user = this.repository.create(data);
        return this.repository.save(user);
    }

    findByEmail(email: string): Promise<User | null> {
        return this.repository.findOneBy({ email });
    }
}

