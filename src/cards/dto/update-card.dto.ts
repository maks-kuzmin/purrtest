import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateCardDto {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор колонки'})
    @IsNumber()
    @IsOptional()
    readonly columnId?: number;

    @ApiProperty({example: 'Portfolio', description: 'Название карточки'})
    @IsString({message: "Должно быть строкой"}) 
    readonly name: string;
}