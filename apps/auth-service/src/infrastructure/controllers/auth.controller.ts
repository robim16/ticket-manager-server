import { Body, Controller, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RegisterUseCase } from "../../application/use-cases/register.usecase";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "../../application/dtos/register.dto";
import { Public } from "../auth/public.decorator";

@Controller()
export class AuthController {
    constructor(private readonly jwtService: JwtService,
        private readonly registerUseCase: RegisterUseCase

    ) { }


    @UseGuards(AuthGuard('local'))
    @Public()
    @MessagePattern('auth.login')
    login(@Req() req) {
        const payload = { sub: req.user.id, email: req.user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }


    @Public()
    @MessagePattern('auth.register')
    async register(@Body() dto: RegisterDto) {
        const user = await this.registerUseCase.execute(dto);

        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);

        return {
            access_token: token,
            user: {
                id: user.id,
                email: user.email,
            },
        };
    }
}