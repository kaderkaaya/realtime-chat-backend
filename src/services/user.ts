import UserDataBase from "../database/user.js";
import ErrorHelper from "../utils/error-helper.js";
class UserService {
    static async register({ username, mail, password }: { username: string, mail: string, password: string }) {
        const existingUser = await UserDataBase.getUserByEmail({ mail });
        if (existingUser) {
            throw new Error("User already exists");
        }

    }
}

export default UserService;