import { Request, Response, Router, NextFunction } from "express";
import { UserService } from "../services/user.service";

const userService = new UserService();

export async function getUsers(req: Request, res: Response, next: NextFunction) {
  const result = await userService.getAllUsers();
  res.send(result);
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    const result = await userService.getUserById(userId);
    res.send(result);
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
    await userService.createUser(req.body);
    res.status(201).send()
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    const result = await userService.updateUser(userId, req.body);
    res.send(result);
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  const userId = req.params.id;
  await userService.deleteUser(userId);
  res.send();
}