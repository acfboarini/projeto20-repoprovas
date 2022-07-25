import { Router } from "express";
import { createTest, getCategories, getTestsByQueryString } from "../controllers/testController.js";
import { authorization } from "../middlewares/authMiddleware.js";
import { validateTestData, validateTestSchema } from "../middlewares/testMiddleware.js";

const testRouter = Router();

testRouter.post("/tests", validateTestSchema, authorization, validateTestData, createTest);
testRouter.get("/tests", authorization, getTestsByQueryString);
testRouter.get("/categories", authorization, getCategories);

export default testRouter;