import jwt from "jsonwebtoken";
import  { config } from "dotenv"
config()
const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403).json({message:"jwt expired"})
      req.user = user
      next()
    })
  } catch (error) {
    console.log(error);
  }
};

export default auth;