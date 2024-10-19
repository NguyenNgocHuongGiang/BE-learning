import exxpress from "express";
import { createUser, deleteUser, getUser, updateUser } from "../controllers/user.controller.js";

const userRoutes = exxpress.Router();

userRoutes.post("/create-user", createUser);

userRoutes.delete("/delete-user/:user_id", deleteUser);

userRoutes.get("/get-user", getUser);

userRoutes.put("/update-user/:user_id", updateUser);

export default userRoutes;
