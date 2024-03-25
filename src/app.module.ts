import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModule } from "./users/users.module";
import { User } from "./users/users.model";
import { ColumnModule } from './columns/columns.module';
import { ColumnTrello } from "./columns/columns.model";
import { CardModule } from './cards/cards.module';
import { MessageModule } from './messages/messages.module';
import { CardTrello } from "./cards/cards.model";
import { MessageTrello } from "./messages/messages.model";
import { AuthModule } from './auth/auth.module';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
          envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
          dialect: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: Number(process.env.POSTGRES_PORT),
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
          models: [User, ColumnTrello, CardTrello, MessageTrello],
          autoLoadModels: true
        }),
        UserModule,
        ColumnModule,
        CardModule,
        MessageModule,
        AuthModule
    ],
})
export class AppModule {}