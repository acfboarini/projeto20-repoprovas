import prisma from "../../src/database.js";

export async function deleteAllData() {
    await prisma.$executeRaw`delete from tests CASCADE`;
    await prisma.$executeRaw`delete from categories CASCADE`;
    await prisma.$executeRaw`delete from "teachersDisciplines" CASCADE`;
    await prisma.$executeRaw`delete from teachers CASCADE`;
    await prisma.$executeRaw`delete from disciplines CASCADE`;
    await prisma.$executeRaw`delete from terms CASCADE`;
}

export async function createDatas() {

    await prisma.category.create({
        data: { name: "Prática" }
    });
        
    await prisma.teacher.create({
        data: {name: "Diego Pinho"}
    });
        
    await prisma.term.create({
        data: { number: 2 }
    });
        
    await prisma.discipline.create({
        data: {
          name: "React",
          termId: 1
        }
    })
    
    await prisma.teacherDiscipline.create({
        data: {
          teacherId: 1,
          disciplineId: 1
        }
    })   
}