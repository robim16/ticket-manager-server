import { User } from "../entities/user.entity";

export abstract class UserRepository {
    abstract findByEmail(email: string): Promise<User | null>;
    
    abstract create(data: {
        name: string; email: string;
        username: string; password: string
    }): Promise<User>;
}