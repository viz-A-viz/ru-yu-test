import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
async function main() {
  const hashPassword = await bcrypt.hash('123', 5);
  const usersData = Array.from({ length: 10 }, () => ({
    username: faker.internet.userName(),
    password: hashPassword,
    firstName: faker.person.firstName(),
  }));
  await prisma.user.createMany({ data: usersData });

  const palettesData = Array.from({ length: 10 }, () => ({
    name: faker.lorem.word(),
    userId: faker.number.int({ min: 1, max: 10 }),
  }));
  await prisma.palette.createMany({ data: palettesData });

  const colorsData = Array.from({ length: 30 }, () => ({
    name: '',
    hex: '',
    paletteId: 0,
  }));
  for (const color of colorsData) {
    const hex = faker.color.rgb({ format: 'hex', casing: 'upper' });
    const res = await fetch(
      `https://www.thecolorapi.com/id?hex=${hex.slice(1)}&format=json`,
    );
    const json = await res.json();
    const name = json.name.value as string;
    const paletteId = faker.number.int({ min: 1, max: 10 });
    color.name = name;
    color.hex = hex;
    color.paletteId = paletteId;
  }
  await prisma.color.createMany({ data: colorsData });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
