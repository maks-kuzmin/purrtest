import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { User } from './users.model';
//import { ValidationPipe } from 'src/pipes/validation.pipe';
import { UsersGuard } from './users.guard';

@ApiTags('Пользователи')
@Controller('users')
export class UserController {

    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: "Создать пользователя"})
    @ApiResponse({status:200, type: User})
    @Post()
    @UsePipes(new ValidationPipe())
    createUsers(@Body() dto: CreateUserDto) {
        return this.usersService.createUser(dto);
    }

    @ApiOperation({summary:"Получить всех пользователей"})
    @ApiResponse({status:200, type: [User]})
    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }

    @ApiOperation({summary:"Получить конкретного пользователя"})
    @ApiResponse({status:200, type: User})
    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.usersService.getUser(id);
    }

    @ApiOperation({summary:"Изменить конкретного пользователя"})
    @ApiResponse({status:200, type: User})
    @UseGuards(UsersGuard)
    @Put(':userId')
    @UsePipes(new ValidationPipe())
    updateUser(@Param('userId') id: string, @Body() updateUserDto: UpdateUserDto) {
 
        return this.usersService.updateUser(+id, updateUserDto);
    }
  
    @ApiOperation({summary:"Удалить конкретного пользователя"})
    @ApiResponse({status:200, description: 'User deleted successfully', type: String})
    @UseGuards(UsersGuard)
    @Delete(':id')
    removeUser(@Param('id') id: string) {
        return this.usersService.removeUser(+id);
    }
}
