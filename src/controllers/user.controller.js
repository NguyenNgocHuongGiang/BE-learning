import initModels from "./../models/init-models.js";
import sequelize from "./../models/connect.js";
import { Op } from "sequelize"; // operator: toan tu (like and in or)

const model = initModels(sequelize);

const createUser = async (req, res) => {
  // let params = req.params;
  // let { id, name } = params;
  // let body = req.body;
  // res.send({
  //   id,
  //   name,
  // });

  // lay data thi body req
  try {
    const {full_name, email, pass_word} = req.body;
    let newUser = await model.users.create({
      full_name,
      email,
      pass_word,
    });
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    let {user_id} = req.params 
    let user = await model.users.findByPk(user_id)
    if(!user){
      return res.status(404).json({message: "user not found"})
    }
    user.destroy()
    return res.status(OK).json({message: "user deleted"})
  } catch (error) {
    return res.status(INTERNAL_SERVER).message("error")
  }
}

const updateUser = async (req, res) => {
  try {
    let {user_id} = req.params 
    const {full_name, pass_word} = req.body;
    //check xem co khong
    let user = await model.users.findByPk(user_id)
    // let user = await model.users.findOne({
    //   where: {user_id}
    // })
    if(!user){
      return res.status(404).json({message: "user not found"})
    }
    await model.users.update(
      {full_name, pass_word},
      {
        where: {user_id}
      }
    )
    return res.status(OK).json({message: "user updated"})
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({message: "error"})
  }
}

const getUser = async (req, res) => {
  try {
    let full_name = req.query.full_name || "";
    let data = await model.users.findAll({
      where: {
        full_name: {
          [Op.like]: `%${full_name}%`,
        },
      },
      include: [
        {
          model: model.video, // chon model
          as: "videos",
          attributes: ["video_id", "video_name"],
          required: true, // ket bang theo inner join, binh thuong khong de la left join
          include: [
            {
              model: model.video_comment,
              as: "video_comments",
            },
          ],
        },
      ],
    });
    return res.status(OK).json(data);
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

/** Lay user co ten like John map voi table video lay thuoc tinh videoname va videoid
 * OUTPUT
 * {
        "user_id": 1,
        "full_name": "John Doe",
        "email": "john@example.com",
        "avatar": "http://res.cloudinary.com/dghvdbogx/image/upload/v1708524200/node39/cgnoxdrfftlfdfe8qu1j.jpg",
        "pass_word": "hashed_pass1",
        "face_app_id": "face123",
        "role_id": 3,
        "refresh_token": null,
        "videos": [
            {
                "video_id": 1,
                "video_name": "Introduction to Coding",
                "video_comments": []
            },
            {
                "video_id": 6,
                "video_name": "Full Stack Web Development Tutorial",
                "video_comments": []
            }
        ]
    },
 */

export { createUser, getUser, deleteUser, updateUser };
