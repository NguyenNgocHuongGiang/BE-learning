import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createToken = (data) => {
  return jwt.sign({ pauload: data }, process.env.ACCESS_TOKEN_KEY, {
    algorithm: "HS256",
    expiresIn: "1d",
  });
};

const verifyToken = (token) => {
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
        return true
    } catch (error) {
        return false
    }
}

export const middlewareToken = (req, res, next) => {
    let {token} = req.headers
    let checkToken = verifyToken(token)
    if(checkToken){
        next()
    }else{
        return res.status(400).json({ message: "Unauthorized" });
    }
}