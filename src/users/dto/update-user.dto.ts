import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class UpdateUserDto {

    @ApiProperty({example: 'Ivan', description: 'Имя'})
    @IsString({message: "Должно быть строкой"})
    readonly name: string;
    
    @ApiProperty({example: 'user@example.com', description: 'Почтовый адрес'})
    @IsString({message: "Должно быть строкой"})
    @IsEmail({}, {message: "Некорректный email"})
    readonly email: string;

    @ApiProperty({example: 'password123', description: 'Пароль'})
    @IsString({message: "Должно быть строкой"})
    @Length(5, 25, {message: "Должен быть от 5 до 25 символов"})
    readonly password: string;
}