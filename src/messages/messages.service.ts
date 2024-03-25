import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/sequelize';
import { MessageTrello } from './messages.model';
import { CardTrello } from 'src/cards/cards.model';
import { ColumnTrello } from 'src/columns/columns.model';

@Injectable()
export class MessagesService {

    constructor(
        @InjectModel(CardTrello) 
        private cardRepository: typeof CardTrello,
        @InjectModel(MessageTrello) 
        private messageRepository: typeof MessageTrello
        ) {}

    async createMessage(cardId: string, columnId: string, userId: string, messageDto: CreateMessageDto) {
        const existCard = await this.cardRepository.findOne({
            where: {
                id: Number(cardId),
                columnId: Number(columnId)
            },
            include: [{
                model: ColumnTrello,
                where: {
                    userId: userId
                }
            }]
        });

        if(existCard) {
            const message = await this.messageRepository.create({
                cardId: Number(cardId),
                text: messageDto.text
            });
            return message;
        } else {
            throw new BadRequestException(`Card with ID ${cardId} for current column for current user does not exist`);
        }
    }

    async getMessages(cardId: string, columnId: string, userId: string) {
        const messages = await this.messageRepository.findAll({
            where: {
                cardId: cardId
            },
            include: [{
                model: CardTrello,
                where: {
                    columnId: columnId
                },
                include: [{
                    model: ColumnTrello,
                    where: {
                        userId: userId
                    }
                }]
            }]
        });

        if(messages.length > 0) {
            return messages;
        } else {
            throw new BadRequestException(`Messages for card with ID ${cardId} for current column for current user does not exist`);
        }
    }

    async getMessage(messageId: string, cardId: string, columnId: string, userId: string) {
        
        const message = await this.messageRepository.findOne({
            where: {
                cardId: Number(cardId),
                id: Number(messageId)
            },
            include: [{
                model: CardTrello,
                where: {
                    columnId: columnId
                },
                include: [{
                    model: ColumnTrello,
                    where: {
                        userId: userId
                    }
                }]
            }]
        });

        if(message) {
            return message;
        } else {
            throw new BadRequestException(`Message with ID ${messageId} for card with ID ${cardId} for current column for current user does not exist`);
        }
    }

    async updateMessage(messageId: number, cardId: number, columnId: number, userId: number, messageDto: UpdateMessageDto) {
        let message = await this.messageRepository.findOne({
            where: {
                id: messageId,
                cardId: cardId
            },
            include: [{
                model: CardTrello,
                where: {
                    columnId: columnId
                },
                include: [{
                    model: ColumnTrello,
                    where: {
                        userId: userId
                    }
                }]
            }]
        })

        if(message) {
            Object.assign(message, messageDto);
            await message.save();
            return message;
        } else {
            throw new BadRequestException(`Message with ID ${messageId} for current card for current column for current user does not exist`);
        }
    }
    
    async removeMessage(messageId: number, cardId: number, columnId: number, userId: number) {
        const message = await this.messageRepository.findOne({
            where: {
                id: messageId,
                cardId: cardId
            },
            include: [{
                model: CardTrello,
                where: {
                    columnId: columnId
                },
                include: [{
                    model: ColumnTrello,
                    where: {
                        userId: userId
                    }
                }]
            }]
           })
    
           if(message) {
            await message.destroy();
            return 'Message deleted successfully';
           } else {
            throw new BadRequestException(`Message with ID ${messageId} for current card for current column for current user does not exist`);
           }
    }
}
