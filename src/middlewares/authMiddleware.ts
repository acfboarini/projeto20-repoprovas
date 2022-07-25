import { Request, Response, NextFunction } from "express";
import userRepository from "../repositories/userRepository.js";
import { signUpSchema, signInSchema } from "../schemas/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function validateSignUp(req: Request, res: Response, next: NextFunction) {
    
    const { email } = req.body;
    
    const validation = signUpSchema.validate(req.body);
    if (validation.error) return res.status(400).send({error: validation.error.message});

    const user = await userRepository.findUserByEmail(email);
    if (user) return res.sendStatus(409);

    next();
}

export async function validateSignIn(req: Request, res: Response, next: NextFunction) {

    const { email, password } = req.body;

    const validation = signInSchema.validate(req.body);
    if (validation.error) return res.status(400).send({error: validation.error.message});

    const user = await userRepository.findUserByEmail(email);
    if (!user) return res.status(404).send("Usuario não existe");

    const passwordValidation = bcrypt.compareSync(password, user.password);
    if (passwordValidation) {
        res.locals.user = user;
        next();
    } else {
        return res.status(422).send("Senha Incorreta");
    }
}

export async function authorization(req: Request, res: Response, next: NextFunction) {

    const { authorization } = req.headers;
    if (!authorization) return res.status(401).send("Missing authorization");

    const token = authorization.replace("Bearer ", "");
    if (!token) return res.status(401).send("Missing token");

    const jwt_secret = process.env.JWT_SECRET;
    const { userId } = jwt.verify(token, jwt_secret) as { userId: number };

    const user = await userRepository.findUserById(userId);
    if (!user) return res.status(401).send("Unauthorized");

    res.locals.user = user;
    next()
}