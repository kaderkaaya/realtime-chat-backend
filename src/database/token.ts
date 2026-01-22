import Token from "../models/token.js";
class TokenDatabase {
    static async storeToken({ userId, token }: { userId: number; token: string }) {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        return await Token.create({ userId, token, expiresAt });
    }

    // static async getToken({ token }: { token: string }) {
    //     return await Token.findOne({ where: { token } });
    // }

    // static async deleteToken({ token }: { token: string }) {
    //     return await Token.destroy({ where: { token } });
    // }
}

export default TokenDatabase;