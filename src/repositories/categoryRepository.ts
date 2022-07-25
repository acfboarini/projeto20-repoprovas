import prisma from "../database.js";

async function findCategoryByName(name) {
    return await prisma.category.findUnique({
        where: {
            name
        }
    })
} 

const categoryRepository = {
    findCategoryByName
}

export default categoryRepository;