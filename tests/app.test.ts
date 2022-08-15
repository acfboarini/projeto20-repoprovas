import supertest from "supertest";
import dotenv from "dotenv";
import app from "../src/app.js";
import prisma from "../src/database.js";
import { createDatas, deleteAllData } from "./factories/scenarioFactory.js";

dotenv.config();

beforeAll(async () => {
  await deleteAllData();
  await createDatas();
})

describe("items test suite", () => {

  it("create user with conflict", async () => {
    const body = {
      email: "teste@gmail.com",
      password: "123",
      confirmPassword: "123"
    }
    const response = await supertest(app).post("/sign-up").send(body);
    expect(response.statusCode).toEqual(409);
  });

  it("create test", async () => {

    const config = {Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1ODM4NjAyMn0.16F4EOwWBWb-SLOK-tM_MEU2PIXglx17uqdOzdmnZVk"};

    const body = {
      name: "prova 2",
      pdfUrl: "p2.pdf",
      category: "Prática",
      teacher: "Diego Pinho",
      discipline: "React"
    }

    const response = await supertest(app).post("/tests").send(body).set(config);
    expect(response.statusCode).toEqual(201);
  });

  it("get tests without authorization", async () => {
    const response = await supertest(app).get("/tests?groupBy=teacher");
    expect(response.statusCode).toEqual(401);
  });

  it("get tests by disciplines", async () => {
    const config = {Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1ODM4NjAyMn0.16F4EOwWBWb-SLOK-tM_MEU2PIXglx17uqdOzdmnZVk"};

    const response = await supertest(app).get("/tests?groupBy=discipline").set(config);
    expect(response.statusCode).toEqual(201);
  });

  it("get tests by teachers", async () => {
    const config = {Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1ODM4NjAyMn0.16F4EOwWBWb-SLOK-tM_MEU2PIXglx17uqdOzdmnZVk"};

    const response = await supertest(app).get("/tests?groupBy=teacher").set(config);
    expect(response.statusCode).toEqual(201);
  });
})

afterAll(async () => {
  await prisma.$disconnect();
})