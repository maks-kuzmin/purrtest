import { Module, forwardRef } from "@nestjs/common";
import { UserController } from "./users.controller";
import { UsersService } from "./users.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users.model";
import { ColumnTrello } from "src/columns/columns.model";
import { AuthModule } from "src/auth/auth.module";

@Module({
    controllers: [UserController],
    providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([User, ColumnTrello]),
        forwardRef(()=> AuthModule)
    ],
    exports: [UsersService]
})
export class UserModule {}