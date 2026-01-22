import UserDataBase from "../database/user.js";
import ErrorHelper from "../utils/error-helper.js";
import HashHelper from "../utils/hash-helper.js";
import JwtHelper from "../utils/jwt-helper.js";
import TokenDatabase from "../database/token.js";
import e from "express";

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
        const isPasswordValid = await HashHelper.comparePassword({ password, hashedPassword: user.dataValues.password });
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
         const payload = { userId: user.id };
        const refresh_token = JwtHelper.generateToken(payload, "7d");
        const access_token = JwtHelper.generateToken(payload, "15m");
        await TokenDatabase.storeToken({ userId: user.id, token: refresh_token });
        await UserDataBase.updateUserStatus({ id: user.id});
        return { ...user.dataValues, refresh_token, access_token };
    }
}

export default UserService;