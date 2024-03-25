import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CardsService } from './cards.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CardTrello } from './cards.model';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { UsersGuard } from 'src/users/users.guard';

@ApiTags('Карты пользователей')
@Controller('users/:userId/columns/:columnId/cards')
export class CardsController {

    constructor(private readonly cardsService: CardsService) {}

    @ApiOperation({summary:"Создание карты"})
    @ApiResponse({status:200, type: CardTrello})
    @Post()
    @UsePipes(new ValidationPipe())
    createCard(@Body() cardDto: CreateCardDto, @Param('columnId') columnId: string, @Param('userId') userId: string) {
        return this.cardsService.createCard(columnId, userId, cardDto);
    }

    @ApiOperation({summary:"Получение карт"})
    @ApiResponse({status:200, type: [CardTrello]})
    @Get()
    getCards(@Param('columnId') columnId: string, @Param('userId') userId: string) {
        return this.cardsService.getCards(columnId, userId);
    }

    @ApiOperation({summary:"Получение конкретной карты"})
    @ApiResponse({status:200, type: CardTrello})
    @Get(':id')
    getCard(@Param('columnId') columnId: string, @Param('id') cardId: string, @Param('userId') userId: string) {
        return this.cardsService.getCard(columnId, cardId, userId);
    }

    @ApiOperation({summary:"Изменить карту"})
    @ApiResponse({status:200, type: CardTrello})
    @UseGuards(UsersGuard)
    @Put(':id')
    @UsePipes(new ValidationPipe())
    updateCard(@Param('id') cardId: string, @Param('columnId') columnId: string, @Param('userId') userId: string, @Body() updateCardDto: UpdateCardDto) {
        return this.cardsService.updateCard(+cardId, +columnId, +userId, updateCardDto);
    } 

    @ApiOperation({summary:"Удалить карту"})
    @ApiResponse({status:200, description: 'Card deleted successfully', type: String})
    @UseGuards(UsersGuard)
    @Delete(':id')
    removeCard(@Param('id') cardId: string, @Param('columnId') columnId: string, @Param('userId') userId: string,) {
        return this.cardsService.removeCard(+cardId, +columnId, +userId);
    } 
}
