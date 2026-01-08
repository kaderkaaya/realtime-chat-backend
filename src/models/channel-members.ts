import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/env.js";


interface ChannelMembersAttributes {
    id: number;
    channelId: number;
    userId: number;
    role?: 'member' | 'admin';
    joinedAt?: Date;
}

interface ChannelMembersCreationAttributes extends Optional<ChannelMembersAttributes, "id"> { }

class ChannelMembers extends Model<ChannelMembersAttributes, ChannelMembersCreationAttributes> implements ChannelMembersAttributes {
    public id!: number;
    public channelId!: number;
    public userId!: number;
    public role!: 'member' | 'admin';
    public joinedAt?: Date;
}

ChannelMembers.init(
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
        role: {
            type: DataTypes.ENUM('member', 'admin'),
            defaultValue: 'member',
        },
        joinedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "channel_members",
        timestamps: true,
    }
);

export default ChannelMembers;