
import jwt from "jsonwebtoken";

const JWTKEY = process.env.JWT_KEY;
class JwtHelper {
    static generateToken(payload: object): string {
        return jwt.sign(payload, JWTKEY!, { expiresIn: "7d" });
    }
}

export default JwtHelper;