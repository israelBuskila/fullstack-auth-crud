import { Request, Response, Router, NextFunction } from "express";
import { UserService } from "../services/user.service";

const userService = new UserService();

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  await userService.createUser(req.body);
  res.status(201).send();
}

export async function login(req: Request, res: Response, next: NextFunction) {
  const token = await userService.loginUser(req.body)
  console.log(token)
  res.cookie("jwt_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(Date.now() + 3600000), // Cookie expires in 1 hour
  }).send();
}

export async function logout(req: Request, res: Response) {
  res.cookie("jwt_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
  }).send();
}
