import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { MessageTrello } from './messages.model';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { UsersGuard } from 'src/users/users.guard';

@ApiTags('Сообщения')
@Controller('users/:userId/columns/:columnId/cards/:cardId/messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    @ApiOperation({summary:"Создание сообщения"})
    @ApiResponse({status:200, type: MessageTrello})
    @Post()
    @UsePipes(new ValidationPipe())
    createMessage(@Body() messageDto: CreateMessageDto, @Param('cardId') cardId: string, @Param('columnId') columnId: string, @Param('userId') userId: string) {
        return this.messagesService.createMessage(cardId, columnId, userId, messageDto);
    }

    @ApiOperation({summary:"Получение сообщения"})
    @ApiResponse({status:200, type: [MessageTrello]})
    @Get()
    getMessages(@Param('cardId') cardId: string, @Param('columnId') columnId: string, @Param('userId') userId: string) {
        return this.messagesService.getMessages(cardId, columnId, userId);
    }

    @ApiOperation({summary:"Получение конкретного сообщения"})
    @ApiResponse({status:200, type: MessageTrello})
    @Get(':id')
    getMessage(@Param('id') messageId: string, @Param('columnId') columnId: string, @Param('cardId') cardId: string, @Param('userId') userId: string) {
        return this.messagesService.getMessage(messageId, cardId, columnId, userId);
    }

    @ApiOperation({summary:"Изменить сообщение"})
    @ApiResponse({status:200, type: MessageTrello})
    @UseGuards(UsersGuard)
    @Put(':id')
    @UsePipes(new ValidationPipe())
    updateMessage(@Param('id')messageId: string, @Param('columnId') columnId: string, @Param('cardId') cardId: string, @Param('userId') userId: string, @Body() updateMessageDto: UpdateMessageDto) {
        return this.messagesService.updateMessage(+messageId, +cardId, +columnId, +userId, updateMessageDto);
    } 

    @ApiOperation({summary:"Удалить сообщение"})
    @ApiResponse({status:200, description: 'Message deleted successfully', type: String})
    @UseGuards(UsersGuard)
    @Delete(':id')
    removeMessage(@Param('id') messageId: string, @Param('columnId') columnId: string, @Param('cardId') cardId: string, @Param('userId') userId: string) {
        return this.messagesService.removeMessage(+messageId, +cardId, +columnId, +userId);
    } 
}
