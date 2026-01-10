import bcrypt from 'bcrypt';

class HashHelper {
    static async hashPassword({ password }: { password: string }): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }

    static async comparePassword({ password, hashedPassword }: { password: string, hashedPassword: string }): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}

export default HashHelper;