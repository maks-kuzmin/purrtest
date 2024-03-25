import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ColumnTrello } from "src/columns/columns.model";

interface UserCreationAttrs {
    name: string;
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Ivan', description: 'Имя'})
    @Column({type:DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example: 'user@example.com', description: 'Почтовый адрес'})
    @Column({type:DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: 'password123', description: 'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @HasMany(() => ColumnTrello)
    columns: ColumnTrello[];
}