import { Request, Response, NextFunction } from "express";
import categoryRepository from "../repositories/categoryRepository.js";
import disciplineRepository from "../repositories/disciplineRepository.js";
import teacherDisciplineRepository from "../repositories/teacherDisciplineRepository.js";
import teacherRepository from "../repositories/teacherRepository.js";
import { testSchema } from "../schemas/testSchema.js";

export function validateTestSchema(req: Request, res: Response, next: NextFunction) {
    const validation = testSchema.validate(req.body);
    if (validation.error) return res.status(400).send({error: validation.error.message});

    next();
}

export async function validateTestData(req: Request, res: Response, next: NextFunction) {
    const { category, teacher, discipline } = req.body;

    const categoryData = await categoryRepository.findCategoryByName(category);
    if (!categoryData) return res.status(404).send("Essa Categoria não esta registrada");

    const teacherData = await teacherRepository.findTeacherByName(teacher);
    if (!teacherData) return res.status(404).send("Esse Professor não esta registrado");

    const disciplineData = await disciplineRepository.findDisciplineByName(discipline);
    if (!disciplineData) return res.status(404).send("Essa Disciplina não esta registrada");

    const teacherDiscipline = await teacherDisciplineRepository.findTeacherDiscipline(
        teacherData.id,
        disciplineData.id
    );
    if (!teacherDiscipline) {
        return res.status(404).send("Esse(a) professor(a) não leciona essa disciplina");
    }
    
    res.locals.categoryId = categoryData.id;
    res.locals.teacherDisciplineId = teacherDiscipline.id;

    next();
}