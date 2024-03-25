import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { ColumnTrello } from "src/columns/columns.model";
import { MessageTrello } from "src/messages/messages.model";


interface CardsCreationAttrs {
    name: string;
    columnId: number;
}

@Table({tableName: 'cards'})
export class CardTrello extends Model<CardTrello, CardsCreationAttrs> {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '1', description: 'Айди колонки, в которой карточка находится'})
    @ForeignKey(() => ColumnTrello)
    @Column
    columnId: number;

    @ApiProperty({example: 'Search', description: 'Название карточки'})
    @Column({type:DataType.STRING, allowNull: false})
    name: string;

    @BelongsTo(() => ColumnTrello)
    column: ColumnTrello;

    @HasMany(() => MessageTrello)
    messages: MessageTrello[];
}