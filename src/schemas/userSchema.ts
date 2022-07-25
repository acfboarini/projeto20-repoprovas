import joi from "joi";
import { userData } from "../services/userService.js";

interface signUpData {
    email: String;
    password: String;
    confirmPassword: String;
}

export const signUpSchema = joi.object<signUpData>({
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref("password"),
})

export const signInSchema = joi.object<userData>({
    email: joi.string().email().required(),
    password: joi.string().required(),
})