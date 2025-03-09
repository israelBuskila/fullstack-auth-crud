import { Router } from "express";
import UserController from "../controllers/user.controller";

const router = Router();
const userController = new UserController()

router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUserById);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

export default router;

