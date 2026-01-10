import express from "express";
const router = express.Router();
import UserController from "../controllers/user.js";
import UserSchema from "../schemas/user.js";
import SchemaHelper from "../utils/schema-helper.js";
import authLimiter from "../utils/limiter.js";

router.post("/register",
    authLimiter,
    SchemaHelper.validateSchemaBody(UserSchema.register),
    (UserController.register));

// router.post("/login",
//     authLimiter,
//     SchemaHelper.validateSchemaBody(UserSchema.login),
//     (UserController.login));


export default router;
