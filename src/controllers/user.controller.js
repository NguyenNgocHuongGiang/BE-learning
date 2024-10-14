import pool from "../../db.js"
import { OK, INTERNAL_SERVER } from "../../const.js"

const createUser = (req, res) => {
    let params = req.params
    let {id, name} = params
    let body = req.body
    res.send({
        id,
        name
    })
}

const getUser = async (req, res) => {
    try {
      const [data] = await pool.query("select * from User limit 1");
      res.status(OK).json(data);
    } catch (error) {
      res.status(INTERNAL_SERVER).json({ message: "error" });
    }
  }

export {createUser, getUser}