import UserModel from "../models/user.js";
class UserDataBase {
    static async getUserByEmail({ mail }: { mail: string }) {
        const user = await UserModel.findOne({ where: { mail } });
        return user;
    }
}

export default UserDataBase;