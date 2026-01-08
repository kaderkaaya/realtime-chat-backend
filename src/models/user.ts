import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/env.js";

interface UserAttributes {
    id: number;
    username?: string;
    mail: string;
    password: string;
    status: 'offline' | 'online' | 'away';
    avatarUrl?: string;
    lastSeenAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id" | "status"> { }

class User extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {
    public id!: number;
    public username?: string;
    public mail!: string;
    public password!: string;
    public status!: 'offline' | 'online' | 'away';
    public avatarUrl?: string;
    public lastSeenAt?: Date;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        mail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('offline', 'online', 'away'),
            defaultValue: 'offline',
        },
        avatarUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastSeenAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "users",
        timestamps: true,
    }
);

export default User;
