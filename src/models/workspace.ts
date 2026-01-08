import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/env.js";

interface WorkspaceAttributes {
    id: number;
    name: string;
    slug: string;
    ownerId: string;
}

interface WorkspaceCreationAttributes extends Optional<WorkspaceAttributes, "id"> { }

class Workspace extends Model<WorkspaceAttributes, WorkspaceCreationAttributes> implements WorkspaceAttributes {
    public id!: number;
    public name!: string;
    public slug!: string;
    public ownerId!: string;

}

Workspace.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        ownerId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        tableName: "workspaces",
        timestamps: true,
    }
);

export default Workspace;