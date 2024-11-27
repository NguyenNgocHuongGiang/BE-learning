import exxpress from "express";
import { createUser, deleteUser, getUser, updateUser, uploadAvatar } from "../controllers/user.controller.js";
import { upload } from "../config/upload.js";
import { uploadCloud } from "../config/uploadCloud.js";

const userRoutes = exxpress.Router();

userRoutes.post("/create-user", createUser);

userRoutes.delete("/delete-user/:user_id", deleteUser);

userRoutes.get("/get-user", getUser);

userRoutes.put("/update-user/:user_id", updateUser);

userRoutes.post("/upload-avatar", upload.single("hinhAnh"), uploadAvatar);

userRoutes.post("/upload-avatar-cloud", uploadCloud.single("hinhAnh"), (req, res) => {
    let file = req.file
    return res.status(200).json(file)
});


export default userRoutes;
