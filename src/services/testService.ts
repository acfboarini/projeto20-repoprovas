import { Test } from "@prisma/client";
import testRepository from "../repositories/testRepository.js";

export type CreateTestData = Omit<Test, "id">

export interface testData {
    name: String;
    pdfUrl: String;
    category: String;
    teacher: String;
    discipline: String;
}

export async function createTest(name: string, pdfUrl: string, locals: any) {

    const { categoryId, teacherDisciplineId } = locals;

    const testData = {
        name, 
        pdfUrl,
        categoryId,
        teacherDisciplineId
    }

    await testRepository.insertTest(testData);
}

export async function getTests(groupBy: string) {

    let tests = await testRepository.getTestsByGroup();

    tests = formatTests(tests);
    tests = agregateTestsByGroup(tests, groupBy);
    
    return tests;
}

function agregateTestsByGroup(tests: any, groupBy: string) {

    const testsGroupBy = tests.reduce(function (acc: any, test: any) {    
        if (!acc[test[groupBy]]) {
            acc[test[groupBy]] = [];
        }
        acc[test[groupBy]].push(test);

        return acc;
    }, {})

    return testsGroupBy;
    // return agregateTestsByTerm(testsDisciplines);
}

function formatTests(tests: any) {
    return tests.map(test => {
        const { id, name, pdfUrl, teacherDiscipline, category } = test;
        const { discipline, teacher } = teacherDiscipline;
        const { term } = discipline;
        return {
            id, 
            name, 
            pdfUrl,
            category: category.name,
            discipline: discipline.name,
            teacher: teacher.name,
            term: term.number
        }
    })
}

function agregateTestsByTerm(tests: any) {
    let testTerms = {};

    const tst = Object.keys(tests).map(discipline => {

        return tests[discipline].reduce(function (acc: any, test: any) {

            if (!acc[test.term]) {
                acc[test.term] = [];
            }
            acc[test.term].push(test);
    
            return acc;
        }, {})
    })

    return tst;
}

const testService = {
    createTest, getTests, 
}

export default testService;