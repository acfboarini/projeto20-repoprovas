import { Request, Response } from "express";
import testRepository from "../repositories/testRepository.js";
import testService from "../services/testService.js";


export async function createTest(req: Request, res: Response) {

    const { name, pdfUrl } = req.body;

    try {
        await testService.createTest(name, pdfUrl, res.locals);
        return res.status(201).send("Teste inserido com sucesso");
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function getTestsByQueryString(req: Request, res: Response) {

    const { groupBy } = req.query as { groupBy: string };

    try {
        const tests = await testService.getTests(groupBy);
        return res.status(201).send(tests);
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function getCategories(req: Request, res: Response) {

    try {  
        const categories = await testRepository.getCategories();
        return res.status(201).send(categories);
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}