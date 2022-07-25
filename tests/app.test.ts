import supertest from "supertest";
import dotenv from "dotenv";
import app from "../src/app.js";

dotenv.config();

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
    const body = {
        name: "prova 2",
        pdfUrl: "p2.pdf",
        category: "Prática",
        teacher: "Diego Pinho",
        discipline: "React"
    }
    const response = await supertest(app).post("/tests").send(body);
    expect(response.statusCode).toEqual(201);
  });

  it("get tests without authorization", async () => {
    const response = await supertest(app).get("/tests?groupBy=teacher");
    expect(response.statusCode).toEqual(401);
  });

  it("get tests by disciplines", async () => {
    const response = await supertest(app).get("/tests?groupBy=discipline");
    expect(response.statusCode).toEqual(201);
    expect(response.body).toBe(JSON);
  });

  it("get tests by teachers", async () => {
    const response = await supertest(app).get("/tests?groupBy=teacher");
    expect(response.statusCode).toEqual(201);
    expect(response.body).toBe(JSON);
  });
})