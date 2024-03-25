import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateColumnDto {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор пользователя'})
    @IsNumber()
    @IsOptional()
    readonly userId?: number;

    @ApiProperty({example: 'In process', description: 'Название колонки'})
    @IsString({message: "Должно быть строкой"}) 
    readonly name: string;
    
    @ApiProperty({example: "Fill in tasks that are in the 'In Progress' status", description: 'Описание колонки'})
    @IsString({message: "Должно быть строкой"}) 
    readonly description: string;
}