import { Request, Response, Router, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { validateDTO } from "../dto/validateDTO";
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";

const router = Router();
const userService = new UserService();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.getAllUsers();
    if (result.length === 0) {
      res.status(404).send({ message: 'No users found' }); 
    }
    res.send(result);
  } catch (error) {
    next(error);  
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.params.id);
    const result = await userService.getUserById(userId);
    if (result.length === 0) {  
      res.status(404).send({ message: 'User not found' });
    }
    res.send(result);
  } catch (error) {
    next(error); 
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await validateDTO(CreateUserDto, req.body);
    const result = await userService.createUser(newUser);
    res.status(201).send(result);
  } catch (error) {
    next(error); 
  }
});

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.params.id);
    const updatedUser = await validateDTO(UpdateUserDto, req.body);
    const result = await userService.updateUser(userId, updatedUser);
    if (!result.length) { 
      res.status(404).send({ message: 'User not found or not updated' });
    }
    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.params.id);
    const result = await userService.deleteUser(userId);
    if (!result.length) {  
      res.status(404).send({ message: 'User not found' });
    }
    res.send({ message: 'User deleted successfully' });
  } catch (error) {
    next(error); 
  }
});

export default router;
