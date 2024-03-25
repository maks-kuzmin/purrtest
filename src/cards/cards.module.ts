import { Module, forwardRef } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CardTrello } from './cards.model';
import { ColumnTrello } from 'src/columns/columns.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CardsController],
  providers: [CardsService],
  imports: [
    SequelizeModule.forFeature([CardTrello, ColumnTrello]),
    forwardRef(()=> AuthModule)
  ]
})
export class CardModule {}
