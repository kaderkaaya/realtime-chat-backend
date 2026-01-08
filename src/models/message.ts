import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/env.js";
import Workspace from "./workspace.js";
import Channel from "./channel.js";
import ChannelMembers from "./channel-members.js";

interface MessageAttributes {
    id: number;
    channelId: number;
    userId: number;
    content: string;
    parentMessageId?: number;
    messageType: 'text' | 'image' | 'file';
    isEdited?: boolean;
    deletedAt?: Date;

}

interface MessageCreationAttributes extends Optional<MessageAttributes, "id"> { }

class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {
    public id!: number;
    public channelId!: number;
    public userId!: number;
    public content!: string;
    public parentMessageId?: number;
    public messageType!: 'text' | 'image' | 'file';
    public isEdited?: boolean;
    public deletedAt?: Date;

}

Message.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        channelId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'channels',
                key: 'id',
            },
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        parentMessageId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            references: {
                model: 'messages',
                key: 'id',
            },
        },
        messageType: {
            type: DataTypes.ENUM('text', 'image', 'file'),
            defaultValue: 'text',
        },
        isEdited: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "messages",
        timestamps: true,
    }
);

export default Message;
