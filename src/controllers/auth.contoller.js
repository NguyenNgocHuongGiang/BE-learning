import initModels from "./../models/init-models.js";
import sequelize from "./../models/connect.js";

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
      return res.status(400).json({ message: "Tài khoản đã tồn tại"});
    }
    const userNew = await model.users.create({full_name: fullName, email: email, pass_word:pass})
    
    return res.status(200).json({ message: "Đăng ký thành công", data: userNew});
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};

export { register };
