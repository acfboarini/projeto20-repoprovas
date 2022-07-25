import prisma from "../database.js";
import { userData } from "../services/userService.js";

async function insertUser(singUpData: userData) {
    await prisma.user.create({
        data: singUpData
    })
}

async function findUserByEmail(email: string) {
    return await prisma.user.findUnique({
        where: {
            email
        }
    })
}

async function findUserById(id: number) {
    return await prisma.user.findUnique({
        where: {
            id
        }
    })
}

const userRepository = {
    insertUser, findUserByEmail, findUserById 
}

export default userRepository;