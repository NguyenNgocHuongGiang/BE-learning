import express from 'express'
import userRoutes from './user.router.js'
import videoRoutes from './video.router.js'
import authRoutes from './auth.router.js'
import swaggerUi from "swagger-ui-express"
import swaggerDocument from '../common/swagger/init.swagger.js'

const rootRoutes = express.Router()

rootRoutes.use('/api-docs', swaggerUi.serve);
rootRoutes.get('/api-docs', swaggerUi.setup(swaggerDocument, {swaggerOptions:{persistAuthorization: true}}));

// rootRoutes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

rootRoutes.get("/", (req,res,next) => {
    const payload = "oke"
    res.status(200).json({ message: payload });
})
rootRoutes.use("/user", userRoutes)
rootRoutes.use("/video", videoRoutes)
rootRoutes.use("/auth", authRoutes)

export default rootRoutes