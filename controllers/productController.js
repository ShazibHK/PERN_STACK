import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Product from "../models/Product.js"
import { validationResult } from "express-validator"
import { config } from "dotenv"
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const secret = process.env.SECRET_KEY;
config()

export const addProducts = async (req, res) => {
  if (req.body == null) {
    return res.status(400).json({ message: "Empty Body Received" });
  }
  const errors = validationResult(req)
  //422Unprocessable Entity 
  //400Bad Request
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array())
  }
  try {
    const { product_name, product_price, product_warranty } = req.body;
    const existingProduct = await Product.findOne({ where: { product_name: product_name }, });
    JSON.stringify(existingProduct)
    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }
    await Product.create({ product_name, product_price, product_warranty })
    const result = await Product.create({ product_name, product_price, product_warranty })
    result.save()
      .then(data => res.status(200).json(data))
      .catch(err => console.error(err))
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  if (req.body == null) return res.status(400).json({ message: "Empty Body Received" });
  try {
    const results = await Product.findAll({
      order: [
        ['id', 'ASC'],
      ],
    }).then((data) => {
      res.status(200).json(data);
    }).catch((error) => {
      res.status(404).json({ message: error.message });
    });
  }
  catch (error) {
    console.error(error.message);
  }
};

export const getProduct = async (req, res) => {
  if (req.body == null) return res.status(400).json({ message: "Empty Body Received" });
  try {
    const { id } = req.params;
    await Product.findOne({
      where: {
        id: id
      },
      order: [
        ['id', 'ASC'],
      ],
    }).then((data) => {
      res.status(200).json(data);
    }).catch((error) => {
      res.status(404).json({ message: error.message });
    });
  }
  catch (error) {
    console.error(error.message);
  }
};

export const updateProduct = async (req, res) => {
  if (req.body == null) return res.status(400).json({ message: "Empty Body Received" });
  const { id } = req.params;
  const { product_name, product_price, product_warranty } = req.body
  console.log("product name" + product_name)
  try {
    Product.update({
      product_name: product_name,
      product_warranty: product_warranty,
      product_price: product_price,
    }, {
      where: {
        id: [id]
      },
    }).then((data) => {
      res.status(200).json({
        product_name: product_name,
        product_warranty: product_warranty,
        product_price: product_price,
      })
    }).catch((error) => {
      res.status(404).json({ message: error.message });
    });
  }
  catch (error) {
    console.error(error.message);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const existingProduct = await Product.findOne({ where: { id: id }, });

    if (!existingProduct) return res.status(400).json({ message: "Product doesn't  exists" });

    Product.destroy({
      where: {
        id: id
      }
    })
      .then(res.json({ message: `Product was deleted!` }))
      .catch(err => console.error(err))
  }
  catch (error) {
    console.error(error.message);
  }
}