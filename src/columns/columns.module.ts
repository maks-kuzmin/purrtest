import { Module, forwardRef } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ColumnTrello } from './columns.model';
import { User } from 'src/users/users.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    controllers: [ColumnsController],
    providers: [ColumnsService],
    imports: [
        SequelizeModule.forFeature([ColumnTrello, User]),
        forwardRef(()=> AuthModule)
    ]
})
export class ColumnModule {}
