import bcrypt from 'bcrypt';

class HashHelper {
    static async hashPassword({ password }: { password: string }): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }

    static async comparePassword({ password, hashedPassword }: { password: string, hashedPassword: string }): Promise<boolean> {
        const slm = await bcrypt.compare(password, hashedPassword);
        console.log('slm',slm);
        
        return slm;
    }
}

export default HashHelper;