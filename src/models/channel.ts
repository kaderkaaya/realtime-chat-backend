import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/env.js";
import Workspace from "./workspace.js";

interface ChannelAttributes {
    id: number;
    name?: string;
    workspaceId: number;
    ownerId: number;
    channelType: 'public' | 'private' | 'dm';
}

interface ChannelCreationAttributes extends Optional<ChannelAttributes, "id"> { }

class Channel extends Model<ChannelAttributes, ChannelCreationAttributes> implements ChannelAttributes {
    public id!: number;
    public name!: string;
    public workspaceId!: number;
    public channelType!: 'public' | 'private' | 'dm';
    public ownerId!: number

}

Channel.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        workspaceId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'workspaces',
                key: 'id',
            },
        },
        channelType: {
            type: DataTypes.ENUM('public', 'private', 'dm'),
            defaultValue: 'public',
        },
        ownerId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        tableName: "channels",
        timestamps: true,
    }
);

export default Channel;