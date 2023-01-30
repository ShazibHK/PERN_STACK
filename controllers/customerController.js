import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"
import { validationResult } from "express-validator"
import { config } from "dotenv"
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const secret = process.env.SECRET_KEY;

config()
let refreshTokens = []
/**
* @swagger  
*   /customerAPI/signup:
*   post:
*     summary: Adds a new user
*     produces:
*       - application/json
*     consumes:
*       - application/json
*     parameters:
*       - in: body
*         name: body
*         schema:
*           type: object
*           required:
*             - email
*             - password
*           properties:
*             email:
*               type: string
*             password:
*               type: string
*     responses:
*       201:
*         description: OK
*/

export const signup = async (req, res) => {

  if (req.body == null) return res.status(400).json({ message: "Empty Body Received" });
  const errors = validationResult(req)//422Unprocessable Entity //400Bad Request
  if (!errors.isEmpty()) return res.status(422).jsonp(errors.array())

  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ where: { email: email }, });

    if (existingUser) 
    {
      return res.status(400).json({ message: "User already exists" });
    }
    console.log(JSON.stringify(existingUser))
    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await User.create({ email:email, password: hashedPassword })
    console.log("Result="+JSON.stringify(result))
    result.save()
      .then((data) => {
        console.log(data)
        const token = jwt.sign({ email: data.email, id: data._id }, secret, { expiresIn: "5m" });
        const refreshToken = jwt.sign({ email: data.email, id: data._id }, secret, { expiresIn: "15m" })
        refreshTokens.push(refreshToken)
        res.status(201).json({ token: token, refreshToken: refreshToken })
      })
      .catch(err => console.error(err))

  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
* @swagger  
*   /customerAPI/signin:
*   post:
*     summary: Existing user? Log In
*     produces:
*       - application/json
*     consumes:
*       - application/json
*     parameters:
*       - in: body
*         name: body
*         schema:
*           type: object
*           required:
*             - email
*             - password
*           properties:
*             email:
*               type: string
*             password:
*               type: string
*     responses:
*       '200':
*         description: OK
*/

export const signin = async (req, res) => {

  if (req.body == null) return res.status(400).json({ message: "Empty Body Received" });
  const errorsCaught= validationResult(req)//422Unprocessable Entity //400Bad Request
  if (!errorsCaught.isEmpty()) return res.status(422).json(errors.array())

  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email: email }, });
    console.log(existingUser.dataValues)
    if (!existingUser) {
      return res.status(400).json({ message: "User doesn't exists" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.SECRET_KEY, { expiresIn: "1m" });
    const refreshToken = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.REFRESH_TOKEN_KEY, { expiresIn: "15m" });
    refreshTokens.push(refreshToken)
    return res.status(201).json({ accessToken, refreshToken });

  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// export const token = async (req, res) => {
//   const refreshToken = req.body.token

//   if (refreshToken == null) return res.sendStatus(401)
//   if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

//   if ((postData.refreshToken) && (postData.refreshToken in tokenList)) {
//     const user = {
//       "email": postData.email,
//       // "id": postData._id 
//     }
//     const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '40s' })
//     const response = {
//       "token": token,
//     }
//     tokenList[postData.refreshToken].token = token
//     console.log(tokenList)
//     res.status(200).json(response);
//   } else {
//     res.status(404).send('Invalid request')
//   }
// }

export const refreshToken = async (req, res) => {
  const postData = req.body
  if ((postData.refreshToken)) {
    const user = {
      "email": postData.email,
      "id": postData.id
    }
    const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "40s" })
    const response = {
      "token": token,
    }
    // update the token in the list
    // tokenList[postData.refreshToken].token = token
    res.status(200).json(response);
  } else {
    res.status(404).send('Invalid request')
  }
}

export const logout = (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
}

export const test = async (re, res) => {
  res.send("Inside test")
}