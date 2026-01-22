import UserDataBase from "../database/user.js";
import ErrorHelper from "../utils/error-helper.js";
import HashHelper from "../utils/hash-helper.js";
import JwtHelper from "../utils/jwt-helper.js";

class UserService {

    static async register({ username, mail, password }: { username: string, mail: string, password: string }) {
        const existingUser = await UserDataBase.getUserByEmail({ mail });
        if (existingUser) {
            throw new Error("User already exists");
        }
        const hashedPassword = await HashHelper.hashPassword({ password });
        const user = await UserDataBase.createUser({ username, mail, password: hashedPassword });
        return user;
    }

    static async login({ mail, password }: { mail: string, password: string }) {
        const user = await UserDataBase.getUserByEmail({ mail });
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = await HashHelper.comparePassword({ password, hashedPassword: user.password });
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        const payload = { userId: user.id };
        const token = JwtHelper.generateToken(payload);

        return { user, token };
    }
}

export default UserService;