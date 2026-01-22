import { Request, Response, NextFunction } from "express";
import UserService from "../services/user.js";
import ResponseHelper from "../utils/response-helper.js";
class UserController {

    static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { username, mail, password } = req.body;
            const user = await UserService.register({ username, mail, password });
            ResponseHelper.success({ res, data: { user }, message: "User registered successfully", statusCode: 201 });
        } catch (e) {
            console.log('e',e);
            
            next(e);
        }
    }

    static async login(req: Request, res: Response): Promise<void> {
        try {
            const { mail, password } = req.body;
            const user = await UserService.login({ mail, password });
            ResponseHelper.success({ res, data: { user }, message: "User logged in successfully", statusCode: 200 });
        } catch (error) {
            ResponseHelper.sendError({ res, message: (error as Error).message, statusCode: (error as any).statusCode || 500 });
        }
    }

}

export default UserController;