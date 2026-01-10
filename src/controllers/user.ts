import { Request, Response } from "express";
import UserService from "../services/user.js";
import ResponseHelper from "../utils/response-helper.js";
class UserController {
    static async register(req: Request, res: Response): Promise<void> {
        try {
            const { username, mail, password } = req.body;
            const user = await UserService.register({ username, mail, password });
            ResponseHelper.success(res, { user }, "User registered successfully", 201);
        } catch (error) {

        }
    }

}

export default UserController;