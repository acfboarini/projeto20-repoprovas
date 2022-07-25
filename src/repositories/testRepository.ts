import prisma from "../database.js";
import { CreateTestData } from "../services/testService.js";

async function insertTest(testData: CreateTestData) {
    return await prisma.test.create({
        data: testData
    })
}

async function getTestsByGroup() {
    return await prisma.test.findMany({
        select: {
            id: true,
            name: true,
            pdfUrl: true,
            category: {
                select: { name: true }
            },
            teacherDiscipline: {
                select: {
                    teacher: {
                        select: { name: true }
                    },
                    discipline: {
                        select: { 
                            name: true,
                            term: {
                                select: { number: true }
                            } 
                        }
                    }
                }
            }
        }
    })
}

async function getCategories() {
    return await prisma.category.findMany({});
}

const testRepository = {
    insertTest, getTestsByGroup, getCategories
}

export default testRepository;