import multer from "multer";
import {v2 as cloudinary} from "cloudinary"
import {CloudinaryStorage} from "multer-storage-cloudinary"
import dotenv from "dotenv"

dotenv.config()

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "avatar", 
        format: async (req, file) => {
            // co dinh nhung file image cho phep
            const validImgFormat = ['png', 'jpg', 'jpeg', 'gif', 'webpp', 'heic']
            // lay dinh dang file hinh tu file
            // mimetype: 'image/jpeg'
            const fileFormat = file.mimetype.split('/')[1]
            if(validImgFormat.includes(fileFormat)){
                return fileFormat
            }
            return '.png'
        },
        public_id: (req,file) => file.originalname.split(".")[0], // lay ten file
        transformation : [
            {
                width: 800,
                quality: 'auto:good', // nén tốt
                fetch_format: 'auto', // tu dong chon dinh dang tot nhat
            }
        ]
    }
})

// khoi  tao multer voi cloudinary storage

export const uploadCloud = multer({storage})