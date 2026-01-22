import UserModel from "../models/user.js";
class UserDataBase {
    static async getUserByEmail({ mail }: { mail: string }) {
        const user = await UserModel.findOne({ where: { mail } });
        return user;
    }

    static async createUser({ username, mail, password }: { username: string, mail: string, password: string }) {
        const newUser = await UserModel.create({ username, mail, password });
        return newUser;
    }

    static async updateUserStatus({ id }: { id: number }) {
        return await UserModel.update(
            { status: 'online', lastSeenAt: new Date() },
            { where: { id } }
        );
    }
}

export default UserDataBase;