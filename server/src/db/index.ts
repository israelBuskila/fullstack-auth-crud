import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm';
import { usersTable } from './schema';
  
const db = drizzle(process.env.DATABASE_URL!);

export async function main() {
  const user: typeof usersTable.$inferInsert = {
    firstname: 'John',
    lastname: 'Dou',
    email: 'john@example.com',
    password: '12345'
  };

  await db.insert(usersTable).values(user);
  console.log('New user created!')

  const users = await db.select().from(usersTable);
  console.log('Getting all users from the database: ', users)

  await db
    .update(usersTable)
    .set({
      password: '1234',
    })
    .where(eq(usersTable.email, user.email));
  console.log('User info updated!')

  await db.delete(usersTable).where(eq(usersTable.email, user.email));
  console.log('User deleted!')
}
export default db


