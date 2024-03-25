import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ColumnTrello } from './columns.model';
import { UpdateColumnDto } from './dto/update-column.dto';
import { UsersGuard } from 'src/users/users.guard';

@ApiTags('Колонки пользователей')
@Controller('users/:userId/columns')
export class ColumnsController {
    constructor(private readonly columnsService: ColumnsService) {}

    @ApiOperation({summary:"Создание колонки"})
    @ApiResponse({status:200, type: ColumnTrello})
    @Post()
    @UsePipes(new ValidationPipe())
    createUser(@Body() columnDto: CreateColumnDto, @Param('userId') userId: string) {
        return this.columnsService.createColumn(userId, columnDto);
    }

    @ApiOperation({summary:"Получение колонок"})
    @ApiResponse({status:200, type: [ColumnTrello]})
    @Get()
    getColumns(@Param('userId') userId: string) {
        return this.columnsService.getColumns(userId);
    }

    @ApiOperation({summary:"Получение конкретной колонки"})
    @ApiResponse({status:200, type: ColumnTrello})
    @Get(':id')
    getColumn(@Param('userId') userId: string, @Param('id') columnId: string) {
        return this.columnsService.getColumn(userId, columnId);
    }

    @ApiOperation({summary:"Изменить колонку"})
    @ApiResponse({status:200, type: ColumnTrello})
    @UseGuards(UsersGuard)
    @Put(':id')
    @UsePipes(new ValidationPipe())
    updateColumn(@Param('userId') userId: string, @Param('id') columnId: string, @Body() updateColumnDto: UpdateColumnDto) {
        return this.columnsService.updateColumn(+columnId, +userId, updateColumnDto);
    } 

    @ApiOperation({summary:"Удалить колонку"})
    @ApiResponse({status:200, description: 'Column deleted successfully', type: String})
    @UseGuards(UsersGuard)
    @Delete(':id')
    removeColumn(@Param('userId') userId: string, @Param('id') columnId: string) {
        return this.columnsService.removeColumn(+userId, +columnId);
    } 

}
