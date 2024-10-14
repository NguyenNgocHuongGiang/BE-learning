import exxpress from "express";
import { createUser, getUser } from "../controllers/user.controller.js";

const userRoutes = exxpress.Router();

userRoutes.post("/:id/:name", createUser);

userRoutes.get("/get-user", getUser);

export default userRoutes;
