import { DataTypes, Model } from "sequelize";
import sequelize from "../config/env.js";

interface WorkspaceMemberAttributes {
    workspaceId: number;
    userId: number;
    role: 'admin' | 'member';
    joinedAt?: Date;
}

class WorkspaceMember extends Model<WorkspaceMemberAttributes> implements WorkspaceMemberAttributes {
    public workspaceId!: number;
    public userId!: number;
    public role!: 'admin' | 'member';
}

WorkspaceMember.init(
    {
        workspaceId: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            references: { model: 'workspaces', key: 'id' }
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            references: { model: 'users', key: 'id' }
        },
        role: {
            type: DataTypes.ENUM('admin', 'member'),
            defaultValue: 'member'
        }
    },
    {
        sequelize,
        tableName: "workspace_members",
        timestamps: true,
        updatedAt: false
    }
);

export default WorkspaceMember;