import { Request, Response } from "express";
import userService from "../services/userService.js";

export async function signUp(req: Request, res: Response) {
    try {
        await userService.signUp(req.body);
        return res.status(201).send("Usuario registrado com sucesso");
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function signIn(req: Request, res: Response) {

    const { user } = res.locals;

    try {
        const token = await userService.signIn(user);
        return res.status(201).send({token});
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}