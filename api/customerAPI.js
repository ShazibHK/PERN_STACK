import express from "express";
const router = express.Router();
import bodyParser from "body-parser"
import { check } from "express-validator"
import { signup,signin,refreshToken,test,logout} from "../controllers/customerController.js"
import auth from "../middleware/auth/auth.js"

const urlencodedBodyParser = bodyParser.urlencoded({ encoded: false })
    router.post("/signup", urlencodedBodyParser,
    [
        check('email', 'Email is not valid').isEmail().normalizeEmail(),
        check('password', 'This password must me 3+ characters long').exists().isLength({ min: 3 })
    ],
    signup);

    router.post("/signin", urlencodedBodyParser,
    [
        check('email', 'Email is not valid').isEmail().normalizeEmail(),
        check('password', 'This password must me 3+ characters long').exists().isLength({ min: 3 })
    ],
    signin);

    router.delete('/logout',logout);

    router.post("/test",auth,test);

    router.post('/refreshToken',refreshToken);
    
export default router;