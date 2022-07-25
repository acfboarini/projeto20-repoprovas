import prisma from "../database.js";

async function findTeacherDiscipline(teacherId: number, disciplineId: number) {
    return await prisma.teacherDiscipline.findFirst({
        where: {
            teacherId,
            disciplineId
        }
    })
}

const teacherDisciplineRepository = {
    findTeacherDiscipline, 
}

export default teacherDisciplineRepository;