import UserModel from './user.js';
import ChannelModel from './channel.js';
import WorkspaceModel from './workspace.js';
import MessageModel from './message.js';
import ChannelMembersModel from './channel-members.js';
import WorkspaceMemberModel from './workspace-members.js';


UserModel.belongsToMany(WorkspaceModel, {
    through: WorkspaceMemberModel,
    foreignKey: 'userId',
});

WorkspaceModel.belongsToMany(UserModel, {
    through: WorkspaceMemberModel,
    foreignKey: 'workspaceId',
});

WorkspaceModel.hasMany(ChannelModel, {
    foreignKey: 'workspaceId',
    as: 'channels'
});

ChannelModel.belongsTo(WorkspaceModel, {
    foreignKey: 'workspaceId',
    as: 'workspace'
});

UserModel.belongsToMany(ChannelModel, {
    through: ChannelMembersModel,
    foreignKey: 'userId',
});

ChannelModel.belongsToMany(UserModel, {
    through: ChannelMembersModel,
    foreignKey: 'channelId',
});

