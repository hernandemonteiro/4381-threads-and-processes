import { connectDB, closeDB } from "../db/connection";
import User from "../db/user.model";
import { fa, faker } from "@faker-js/faker";

function generateUser() {
  return {
    name: faker.name.fullName(),
    company: faker.company.name(),
    dateBirth: faker.date.past(),
    password: faker.internet.username() + faker.company.name(),
    createdAt: faker.date.past({
      years: 10,
      refDate: new Date(),
    }),
    updatedAt: faker.date.past({
      years: 9,
      refDate: new Date(),
    }),
    lastPasswordUpdateAt: faker.date.past({
      years: 8,
      refDate: new Date(),
    }),
  };
}

async function seed() {
  try {
    const users = Array.from({ length: 200000 }, generateUser);
    await User.bulkCreate(users);
    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
}

(async () => {
  await connectDB();
  console.time("Seeding Time");
  await seed();
  console.timeEnd("Seeding Time");
  await closeDB();
})();
