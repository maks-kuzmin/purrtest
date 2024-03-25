import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class UsersGuard implements CanActivate {

    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        try {
            const authHeader = request.headers.authorization;   
            if(!authHeader) {
                throw new UnauthorizedException({message: 'Пользователь не авторизован'});
            }

            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if(bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'Пользователь не авторизован'});
            }
            console.log(this.jwtService.verify(token));
            
            const user = this.jwtService.verify(token);
            request.user = user;
            console.log(user);
            
            if(request.user.id !== Number(request.params.userId)) {
                console.log("request.user.id: ", request.user.id);
                console.log("Number: ", Number(request.params.userId));
                throw new HttpException('Пользователь не имеет право на это действие', HttpStatus.FORBIDDEN);
            }
            return true; 
        } catch(e) {
            throw new HttpException(e.message, HttpStatus.FORBIDDEN);
        }
    }
}