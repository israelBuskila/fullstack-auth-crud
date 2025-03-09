import { Request, Response, Router } from "express";
import { UserService } from "../services/user.service";
import { validateDTO } from "../dto/validateDTO";
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";

const router = Router();

const userService = new UserService()

router.get("/", async (req: Request, res: Response) => {
  const result = await userService.getAllUsers()
  res.send(result)
});

router.get("/:id", async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const result = await userService.getUserById(userId)
  res.send(result)
});

router.post("/",  async (req: Request, res: Response) => {
  const newUser = await validateDTO(CreateUserDto, req.body)
  const result = await userService.createUser(newUser)
  res.status(201).send(result);
});


router.put("/:id", async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const updatedUser = await validateDTO(UpdateUserDto, req.body)
  const result = await userService.updateUser(userId, updatedUser)
  res.send(result);
});


router.delete("/:id", async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const result = await userService.deleteUser(userId)
  res.send(result);
});

export default router;
