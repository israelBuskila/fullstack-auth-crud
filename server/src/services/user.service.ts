import { eq } from "drizzle-orm";
import db from "../db/db";
import { UserTable } from "../db/schema";
import { CreateUserDto, LoginUserDto, UpdateUserDto } from "../dto/user.dto";
import bcrypt from 'bcryptjs';
import { validateDTO } from "../utils/validateDTO";
import { generateToken } from "../utils/authUtils";

const colsWithoutPassword = {id: UserTable.id,firstname: UserTable.firstname,lastname: UserTable.lastname,email: UserTable.email}

export class UserService {
    async getAllUsers() {
        return db.select(colsWithoutPassword).from(UserTable)
    }

    async getUserById(id: string) {
        return db.select(colsWithoutPassword).from(UserTable).where(eq(UserTable.id, id))
    }

    async getUserByEmail(email: string) {
        return db.select().from(UserTable).where(eq(UserTable.email, email))
    }

    async createUser(user: CreateUserDto){
        const newUser = await validateDTO(CreateUserDto, user);
        const hashedPassword = await bcrypt.hash(newUser.password, 10);
        
        const validUser = { ...newUser, password: hashedPassword };
        return db.insert(UserTable).values(validUser)
      }

    async updateUser(id: string, userData:UpdateUserDto) {
        const updatedUser = await validateDTO(UpdateUserDto, userData);
        return db.update(UserTable).set({...updatedUser}).where(eq(UserTable.id, id))
    }

    async deleteUser(id: string) {
        return db.delete(UserTable).where(eq(UserTable.id, id))
    }

    async loginUser(credentials: LoginUserDto) {
        console.log(credentials)
        const { email, password } = await validateDTO(LoginUserDto, credentials);
        console.log(email, password)

        const user = await this.getUserByEmail(email);
        if (!user.length) return;
        console.log(user)
        
        const isPasswordValid = await bcrypt.compare(password, user[0].password);
        if (!isPasswordValid) return;
        
        const token = generateToken(user[0].id);
        return token
      }
  }