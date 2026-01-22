import { Attributes, DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/env.js";


interface TokenAttributes {
    id: number;
    userId: number;
    token: string;
    expiresAt: Date;

}

interface TokenCreationAttributes extends Optional<TokenAttributes, "id"> { }

class Token extends Model<TokenAttributes, TokenCreationAttributes> implements TokenAttributes {
    public id!: number;
    public userId!: number;
    public token!: string;
    public expiresAt!: Date;

    public isExpired(): boolean {
        return new Date() > this.expiresAt;
    }

}

    Token.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        token: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "tokens",
        timestamps: true,
    }
);

export default Token;
