import { Module, forwardRef } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { MessageTrello } from './messages.model';
import { CardTrello } from 'src/cards/cards.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
  imports: [
    SequelizeModule.forFeature([CardTrello, MessageTrello]),
    forwardRef(()=> AuthModule)
]
})
export class MessageModule {}
