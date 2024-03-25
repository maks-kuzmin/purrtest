import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { CardTrello } from "src/cards/cards.model";
import { User } from "src/users/users.model";

interface ColumnsCreationAttrs {
    name: string;
    description: string;
    userId: number;
}

@Table({tableName: 'columns'})
export class ColumnTrello extends Model<ColumnTrello, ColumnsCreationAttrs> {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '1', description: 'Уникальный идентификатор пользователя'})
    @ForeignKey(() => User)
    @Column
    userId: number;

    @ApiProperty({example: 'In process', description: 'Название колонки'})
    @Column({type:DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example: "Fill in tasks that are in the 'In Progress' status", description: 'Описание колонки'})
    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => CardTrello)
    cards: CardTrello[];
}