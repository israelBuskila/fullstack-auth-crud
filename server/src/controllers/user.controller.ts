import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const userService = new UserService()

class UserController {
  async getUsers(req: Request, res: Response) {
    const result = await userService.getAllUsers()
    res.send(result)
  }

  async getUserById(req: Request, res: Response) {
    const userId = Number(req.params.id);
    const result = await userService.getUserById(userId)
    res.send(result)
  }

  async createUser(req: Request, res: Response) {
    const newUser = req.body;
    console.log(newUser)
    const result = await userService.createUser(newUser)
    res.status(201).send(result);
  }

  async updateUser(req: Request, res: Response) {
    const userId = Number(req.params.id);
    const updatedData = req.body;
    const result = await userService.updateUser(userId, updatedData)
    res.send(result);
  }

  async deleteUser(req: Request, res: Response) {
    const userId = Number(req.params.id);
    const result = await userService.deleteUser(userId)
    res.send(result);
  }
}

export default  UserController;
