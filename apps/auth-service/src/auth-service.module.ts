import { Module } from '@nestjs/common';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserRepository } from './domain/repositories/user.repository';
import { UserRepositoryImpl } from './infrastructure/repositories/user.repository.impl';
import { LoginUseCase } from './application/use-cases/login.usecase';
import { RegisterUseCase } from './application/use-cases/register.usecase';
import { LocalStrategy } from './infrastructure/auth/local.strategy';
import { JwtStrategy } from './infrastructure/auth/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: parseInt(
            configService.getOrThrow<string>(
              'ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC',
            ),
          ),
        },
      }),
      inject: [ConfigModule],
    }),
  ],
  controllers: [AuthController],
  providers: [
    { provide: UserRepository, useClass: UserRepositoryImpl},
    LoginUseCase,
    RegisterUseCase,
    LocalStrategy,
    JwtStrategy
  ],
  exports: [JwtModule]
})
export class AuthServiceModule {}
