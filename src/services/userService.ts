import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import userRepository from "../repositories/userRepository.js";
dotenv.config();

export type userData = Omit<User, "id">

async function signUp(userData: userData) {

    const { email, password } = userData;
    const SALT = 10;

    const passwordHash = bcrypt.hashSync(password, SALT);

    return await userRepository.insertUser({
        email,
        password: passwordHash
    })
}

async function signIn(user: User) {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    return token;
}

const userService = {
    signUp, signIn, 
}

export default userService;