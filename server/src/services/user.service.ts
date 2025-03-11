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
        const user = await db.select().from(UserTable).where(eq(UserTable.email, email));
        return user.length ? user[0] : null;
    }

    async createUser(user: CreateUserDto) {
        const newUser = await validateDTO(CreateUserDto, user);
    console.log(newUser)
        const existingUser = await this.getUserByEmail(newUser.email);
        if (existingUser) {
            throw new Error("Email already exists");
        }
    
        const hashedPassword = await bcrypt.hash(newUser.password, 10);
        const validUser = { ...newUser, password: hashedPassword };
        console.log(validUser)
        return db.insert(UserTable).values(validUser);
    }
    

    async updateUser(id: string, userData:UpdateUserDto) {
        const updatedUser = await validateDTO(UpdateUserDto, userData);
        return db.update(UserTable).set({...updatedUser}).where(eq(UserTable.id, id))
    }

    async deleteUser(id: string) {
        return db.delete(UserTable).where(eq(UserTable.id, id))
    }

    async loginUser(credentials: LoginUserDto) {
        const { email, password } = await validateDTO(LoginUserDto, credentials);
    
        const user = await this.getUserByEmail(email);
        if (!user) {
            throw new Error("Invalid email or password");
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }
    
        return generateToken(user.id);
    }
    
  }