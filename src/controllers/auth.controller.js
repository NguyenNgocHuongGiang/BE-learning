import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import bcrypt from "bcrypt";
import transporter from "../config/transporter.js";
import { createToken } from "../config/jwt.js";
import dotenv from "dotenv"

dotenv.config()

const model = initModels(sequelize);

const register = async (req, res) => {
  try {
    const { fullName, email, pass } = req.body;
    const userExist = await model.users.findOne({
      where: {
        email,
      },
    });
    if (userExist) {
      return res.status(400).json({ message: "Tài khoản đã tồn tại" });
    }
    const userNew = await model.users.create({
      full_name: fullName,
      email: email,
      pass_word: bcrypt.hashSync(pass, 10),
    });

    // cau hinh gui mail
    const mailOption = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Welcome to BE-LEARNING",
      text: `Hello ${fullName}. Best Regards.`,
    };
    // gui mail
    transporter.sendMail(mailOption, (err, info) => {
      if (err) {
        return res.status(500).json({ message: "Send email failed" });
      }
      return res.status(201).json({ message: "Đăng ký thành công" });
    });
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, pass } = req.body;
    const userExist = await model.users.findOne({
      where: {
        email,
      },
    });
    if (!userExist) {
      return res.status(400).json({ message: "Email không tồn tại" });
    }
    let checkPass = bcrypt.compareSync(pass, userExist.pass_word);
    if (!checkPass) {
      return res.status(400).json({ message: "Password sai" });
    }
    // tao token (access token va refresh token)
    /**
     * co 3 tham so
     *  - payload va luu vao token
     *  - key tao token
     *  - setting lifetime cua token va thuat toan ma hoa
     */
    let accessToken = createToken({
      userId: userExist.user_id,
    });
    return res
      .status(200)
      .json({ message: "Đăng nhập thành công", data: accessToken });
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};

const loginFacebook = async (req, res) => {
  try {
    const { id, email, name } = req.body;
    let userExist = await model.users.findOne({
      where: {
        face_app_id: id,
      },
    });
    if (!userExist) {
      userExist = await model.users.create({
        full_name: name,
        email,
        face_app_id: id,
      });
    }
    let accessToken = createToken({
      userId: userExist.user_id,
    });
    return res
      .status(200)
      .json({ message: "Đăng nhập thành công", data: accessToken });
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};

export { register, login, loginFacebook };
