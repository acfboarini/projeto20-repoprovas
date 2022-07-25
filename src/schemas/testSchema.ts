import joi from "joi";
import { testData } from "../services/testService.js";

export const testSchema = joi.object<testData>({
    name: joi.string().required(),
    pdfUrl: joi.string().required(),
    category: joi.string().required(),
    teacher: joi.string().required(),
    discipline: joi.string().required()
})