import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ColumnTrello } from 'src/columns/columns.model';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardTrello } from './cards.model';

@Injectable()
export class CardsService {

    constructor(
        @InjectModel(CardTrello) 
        private cardRepository: typeof CardTrello,
        @InjectModel(ColumnTrello) 
        private columnRepository: typeof ColumnTrello
        ) {}

    async createCard(columnId: string, userId: string,  cardDto: CreateCardDto) {
        const existColumn = await this.columnRepository.findOne({
            where: {
                id: columnId,
                userId: userId
            }
        });

        if(existColumn) {
            const column = await this.cardRepository.create({
                columnId: Number(columnId),
                name: cardDto.name
            });
            return column;
        } else {
            throw new BadRequestException(`Column with ID ${columnId} for user with ID ${userId} does not exist`);
        }
    }

    async getCards(columnId: string, userId: string) {
        const cards = await this.cardRepository.findAll({
            where: {
                columnId: columnId
            },
            include: [{
                model: ColumnTrello,
                where: {
                    userId: userId
                }
            }]
        });
        
        if(cards.length > 0) {
            return cards;
        } else {
            throw new BadRequestException(`Cards for column with ID ${columnId} for user with ID ${userId} does not exist`);
        }
    }

    async getCard(columnId: string, cardId: string, userId: string) {
        const card = await this.cardRepository.findOne({
            where: {
                columnId: Number(columnId),
                id: Number(cardId)
            },
            include: [{
                model: ColumnTrello,
                where: {
                    userId: userId
                }
            }]
        });

        if(card) {
            return card;
        } else {
            throw new BadRequestException(`Card with ID ${cardId} for column with ID ${columnId} for user with ID ${userId} does not exist`);
        }
    }

    async updateCard(cardId: number, columnId: number, userId: number, cardDto: UpdateCardDto) {
        let card = await this.cardRepository.findOne({
            where: {
                id: cardId,
                columnId: columnId
            },
            include: [{
                model: ColumnTrello,
                where: {
                    userId: userId
                }
            }]
        })

        if(card) {
            Object.assign(card, cardDto);
            await card.save();
            return card;
        } else {
            throw new BadRequestException(`Card with ID ${cardId} for column with ID ${columnId} for user with ID ${userId} does not exist`);
        }
    }

    async removeCard(cardId: number, columnId: number, userId: number) {
        const card = await this.cardRepository.findOne({
            where: {
                id: cardId,
                columnId: columnId
            },
            include: [{
                model: ColumnTrello,
                where: {
                    userId: userId
                }
            }]
           })
    
           if(card) {
            await card.destroy();
            return 'Card deleted successfully';
           } else {
            throw new BadRequestException(`Card with ID ${cardId} for column with ID ${columnId} for user with ID ${userId} does not exist`);
           }
    }
}

