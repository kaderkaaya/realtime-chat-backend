import Joi from "joi";
import { log } from "node:console";
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default {

    register: Joi.object({
        mail: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .pattern(passwordRegex)
            .min(8)
            .required()
            .messages({
                'string.min': 'Password must be at least 8 characters long,',
                'string.pattern.base': 'contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
            }),
        username: Joi.string()
            .min(3)
            .max(30)
            .required(),
    }),

    login: Joi.object({
        mail: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .required(),
    })
}