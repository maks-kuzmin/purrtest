import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ColumnTrello } from './columns.model';
import { CreateColumnDto } from './dto/create-column.dto';
import { User } from 'src/users/users.model';
import { UpdateColumnDto } from './dto/update-column.dto';

@Injectable()
export class ColumnsService {

    constructor(
        @InjectModel(ColumnTrello) 
        private columnRepository: typeof ColumnTrello,
        @InjectModel(User) 
        private userRepository: typeof User
        ) {}

    async createColumn(userId: string, columnDto: CreateColumnDto) {
        
        const existUser = await this.userRepository.findOne({
            where: {
                id: Number(userId),
            }
        });

        if(existUser) {
            const column = await this.columnRepository.create({
                userId: Number(userId), // не уверен как правильно. Передавать через dto userId или через Url
                name: columnDto.name,
                description: columnDto.description
            });
            return column;
        } else {
            throw new BadRequestException(`User with ID ${userId} does not exist`);
        }
    }

    async getColumns(userId: string) {

        const columns = await this.columnRepository.findAll({
            where: {
                userId: userId
            }
        });

        if(columns) {
            return columns;
        } else {
            throw new BadRequestException(`Columns for user with ID ${userId} does not exist`);
        }
    }

    async getColumn(userId: string, columnId: string) {

        const column = await this.columnRepository.findOne({
            where: {
                userId: Number(userId),
                id: Number(columnId)
            }
        });

        if(column) {
            return column;
        } else {
            throw new BadRequestException(`Column with ID ${columnId} for user with ID ${userId} does not exist`);
        }
    }

    async updateColumn(columnId: number, userId: number, columnDto: UpdateColumnDto) {
        
        let column = await this.columnRepository.findOne({
            where: {
                userId: Number(userId),
                id: columnId
            }
        })

        if(column) {
            Object.assign(column, columnDto);
            await column.save();
            return column;
        } else {
            throw new BadRequestException(`Column with ID ${columnId} for current user does not exist`);
        }
    }

    async removeColumn(userId: number, columnId: number) {
       const column = await this.columnRepository.findOne({
        where: {
            userId: Number(userId),
            id: columnId
        }
       })

       if(column) {
        await column.destroy();
        return 'Column deleted successfully';
       } else {
        throw new BadRequestException(`Column with ID ${columnId} for current user does not exist`);
       }
    }
}
