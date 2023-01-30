import express from "express";
import bodyParser from "body-parser"
import {check} from "express-validator"
import {addProducts,getProduct,getProducts,updateProduct,deleteProduct} from "../controllers/productController.js"
const urlencodedBodyParser = bodyParser.urlencoded({ encoded: false })
const router = express.Router();
router.post("/addProducts", urlencodedBodyParser,
[
    check('product_name', 'This password must me 3+ characters long').exists().isLength({ min: 3 }),
    check('product_price', 'product_price is not valid,int value expected').isInt(),
    check('product_warranty', 'product_warranty is not valid,int value expected').isInt(),
],
addProducts);
router.get("/getProducts",getProducts);
router.post("/getProduct/:id",getProduct);
router.put("/updateProduct/:id",updateProduct);
router.delete("/deleteProduct/:id",deleteProduct);

export default router;