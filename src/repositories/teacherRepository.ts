import prisma from "../database.js";

async function findTeacherByName(name: string) {
    return await prisma.teacher.findUnique({
        where: {
            name
        }
    })
}

const teacherRepository = {
    findTeacherByName,
}

export default teacherRepository;