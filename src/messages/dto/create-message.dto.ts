import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMessageDto {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор карты'})
    @IsNumber()
    @IsOptional()
    readonly cardId?: number;

    @ApiProperty({example: 'Give me something', description: 'Текст сообщения'})
    @IsString({message: "Должно быть строкой"}) 
    readonly text: string;
}