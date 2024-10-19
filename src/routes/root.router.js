import express from 'express'
import userRoutes from './user.router.js'
import videoRoutes from './video.router.js'
import authRoutes from './auth.router.js'

const rootRoutes = express.Router()

rootRoutes.use("/user", userRoutes)
rootRoutes.use("/video", videoRoutes)
rootRoutes.use("/auth", authRoutes)

export default rootRoutes