import prisma from "../database.js";

async function findDisciplineByName(name: string) {
    return await prisma.discipline.findUnique({
        where: {
            name
        }
    })
}

const disciplineRepository = {
    findDisciplineByName,
}

export default disciplineRepository;