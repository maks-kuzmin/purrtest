import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { CardTrello } from "src/cards/cards.model";


interface MessagesCreationAttrs {
    text: string;
    cardId: number;
}

@Table({tableName: 'messages'})
export class MessageTrello extends Model<MessageTrello, MessagesCreationAttrs> {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '1', description: 'Айди карты, в которой находится сообщение'})
    @ForeignKey(() => CardTrello)
    @Column
    cardId: number;

    @ApiProperty({example: 'Сообщение', description: 'Текст сообщения'})
    @Column({type:DataType.STRING, allowNull: false})
    text: string;

    @BelongsTo(() => CardTrello)
    card: CardTrello;
}
