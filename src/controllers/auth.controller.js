import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import bcrypt from "bcrypt";
import transporter from "../config/transporter.js";
import {
  createRefreshToken,
  createRefreshTokenAsyncKey,
  createToken,
  createTokenAsyncKey,
} from "../config/jwt.js";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

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

    // tao refreshToken
    let refreshToken = createRefreshToken({ userId: userExist.user_id });
    //luu vao database
    await model.users.update(
      {
        refresh_token: refreshToken,
      },
      {
        where: {
          user_id: userExist.user_id,
        },
      }
    );
    //luu vao cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // cookie khong the truy cpa tu js de bao mat
      secure: false, // dong cho localhost neu chay tren https thi set la tru
      sameSite: "Lax", // dam bao cho cookie duoc gui trong nhieu domain khac nhau
      maxAge: 7 * 24 * 60 * 60 * 1000,
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

const extendToken = async (req, res) => {
  try {
    //lay refreshtoken tu cookie
    let refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401);
    }
    console.log(refreshToken);

    // check refreshtoken trong database
    let userRefreshToken = await model.users.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    console.log(userRefreshToken);

    if (!userRefreshToken) {
      return res.status(401);
    }
    // let newAccessToken = createToken({
    //   userId: userRefreshToken.user_id,
    // });
    let newAccessToken = createTokenAsyncKey({
      userId: userRefreshToken.user_id,
    });
    return res.status(200).json({ message: "success", data: newAccessToken });
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};

const loginAsyncKey = async (req, res) => {
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
    let accessToken = createTokenAsyncKey({
      userId: userExist.user_id,
    });

    // tao refreshToken
    let refreshToken = createRefreshTokenAsyncKey({
      userId: userExist.user_id,
    });
    //luu vao database
    await model.users.update(
      {
        refresh_token: refreshToken,
      },
      {
        where: {
          user_id: userExist.user_id,
        },
      }
    );
    //luu vao cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // cookie khong the truy cpa tu js de bao mat
      secure: false, // dong cho localhost neu chay tren https thi set la tru
      sameSite: "Lax", // dam bao cho cookie duoc gui trong nhieu domain khac nhau
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(200)
      .json({ message: "Đăng nhập thành công", data: accessToken });
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};

const forgotPass = async (req, res) => {
  try {
    let { email } = req.body;
    let checkEmail = await model.users.findOne({
      where: {
        email,
      },
    });
    if (!checkEmail) {
      return res.status(400).json({ message: "email wrong" });
    }
    let randomCode = crypto.randomBytes(5).toString("hex");
    let expired = new Date(new Date().getTime() + 1 * 60 * 60 * 1000);
    //luu code vao db
    await model.code.create({
      code: randomCode,
      expired,
    });
    const mailOption = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Forgot pass",
      text: `Code: ${randomCode}`,
    };
    // gui mail
    transporter.sendMail(mailOption, (err, info) => {
      if (err) {
        return res.status(500).json({ message: "Send email failed" });
      }
      return res.status(201).json({ message: "check email" });
    });
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};

const changePass = async (req, res) => {
  try {
    let {code, email, newPass} = req.body
    let checkCode = await model.code.findOne({
      where: {
        code
      }
    })
    if(!checkCode){
      return res.status(400).json({ message: "code wrong" });
    }

    // them check code co con expired khong

    let checkEmail = await model.users.findOne({
      where: {
        email
      }
    })
    if(!checkEmail){
      return res.status(400).json({ message: "email wrong" });
    }

    let hashNewPass = bcrypt.hashSync(newPass,10)
    checkEmail.pass_word = hashNewPass
    checkEmail.save()

    //remove code sau khi change pass thanh cong
    await model.code.destroy({
      where:{
        code
      }
    })
    return res.status(200).json({ message: "change pass success" });
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};

export {
  register,
  login,
  loginFacebook,
  extendToken,
  loginAsyncKey,
  forgotPass,
  changePass,
};
