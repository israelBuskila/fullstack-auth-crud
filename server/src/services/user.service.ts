import { eq } from "drizzle-orm";
import db from "../db/db";
import { UserTable } from "../db/schema";
import { User } from "../types/user.interface";

export class UserService {
    async getAllUsers() {
        return db.select().from(UserTable)
    }

    async getUserById(id: number) {
        return db.select().from(UserTable).where(eq(UserTable.id, id))
    }

    async getUserByEmail(email: string) {
        return db.select().from(UserTable).where(eq(UserTable.email, email))
    }

    async createUser(user: User){
        return db.insert(UserTable).values(user).$returningId()
      }

    async updateUser(id: number, user:User) {
        return db.update(UserTable).set({...user}).where(eq(UserTable.id, id))
    }

    async deleteUser(id: number) {
        return db.delete(UserTable).where(eq(UserTable.id, id))
    }

  }