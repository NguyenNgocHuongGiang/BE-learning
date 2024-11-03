import express from "express"
import { register, login, loginFacebook, extendToken, loginAsyncKey, forgotPass , changePass} from "../controllers/auth.controller.js"

const authRoutes = express.Router()

authRoutes.post("/register", register)
authRoutes.post("/login", login) // khoa doi xung
authRoutes.post("/login-face", loginFacebook)
authRoutes.post("/extend-token", extendToken)
authRoutes.post("/login-async-key", loginAsyncKey) // khoa bat doi xung
authRoutes.post("/forgot-password", forgotPass) // khoa bat doi xung
authRoutes.post("/change-password", changePass) // khoa bat doi xung

export default authRoutes