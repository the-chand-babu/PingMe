import { Router } from "express";
import {
  getUserProfile,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} from "../../controllers/userController"; // Ensure alias is correctly configured in tsconfig.json

const userRoutes = Router();

userRoutes.get("/", getUsers);
userRoutes.get("/profile/:id", getUserProfile);
userRoutes.patch("/:id", updateUser); // Fixed
userRoutes.delete("/:id", deleteUser); // Fixed
userRoutes.post("/", createUser);

export default userRoutes;
