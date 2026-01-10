import Joi from "joi";
export default {

    register: Joi.object({
        mail: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        username: Joi.string().min(3).max(30).optional(),
    }),
}