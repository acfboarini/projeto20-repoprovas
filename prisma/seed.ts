import bcrypt from "bcrypt";
import prisma from "../src/database.js";

async function main(){
  const SALT = 10;
  const hashedPassword = bcrypt.hashSync("admin", SALT);

  await prisma.user.upsert({
    where: { email: "teste@gmail.com" },
    update: {},
    create: {
      email: "teste@gmail.com",
      password: hashedPassword
    }
  });
}

main().catch(e => {
  console.log(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
})