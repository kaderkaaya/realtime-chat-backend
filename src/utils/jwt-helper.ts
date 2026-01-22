import jwt, { SignOptions, Secret } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as Secret;

class JwtHelper {
    static generateToken(payload: object,   expiresIn: SignOptions["expiresIn"]): string {
          const options: SignOptions = { expiresIn };
        return jwt.sign(payload, JWT_SECRET!, options);
    }

}

export default JwtHelper;