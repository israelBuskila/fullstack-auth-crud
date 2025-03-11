import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { randomUUID } from "crypto";



export const UserTable = mysqlTable('users', {
  id: varchar("id", { length: 36 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => randomUUID())
    , 
  firstname: varchar('firstname', { length: 255 }).notNull(),
  lastname: varchar('lastname', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
});
