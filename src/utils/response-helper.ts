import { Response } from "express";
class ResponseHelper {
    static success({ res, data, message, statusCode }: { res: Response, data: any, message: string, statusCode: number }) {
        return res.status(statusCode).json({
            success: true,
            statusCode,
            data,
            message
        })
    };

    static sendError({ res, message, statusCode }: { res: Response, message: any, statusCode: number }) {
        return res.status(statusCode).json({
            success: false,
            statusCode,
            message
        })
    };

}

export default ResponseHelper;