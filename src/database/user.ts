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
}

export default UserDataBase;