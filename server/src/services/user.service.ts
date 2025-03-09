import { eq } from "drizzle-orm";
import db from "../db/db";
import { UserTable } from "../db/schema";
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import bcrypt from 'bcryptjs';

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

    async createUser(newUser: CreateUserDto){
        const hashedPassword = await bcrypt.hash(newUser.password, 10);
        
        const validUser = { ...newUser, password: hashedPassword };
        return db.insert(UserTable).values(validUser).$returningId()
      }

    async updateUser(id: number, updatedUser:UpdateUserDto) {
        return db.update(UserTable).set({...updatedUser}).where(eq(UserTable.id, id))
    }

    async deleteUser(id: number) {
        return db.delete(UserTable).where(eq(UserTable.id, id))
    }

  }