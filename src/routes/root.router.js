import express from 'express'
import userRoutes from './user.router.js'

const rootRoutes = express.Router()

rootRoutes.use("/user", userRoutes)

export default rootRoutes