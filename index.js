import express, { json } from "express"
import cors from "cors"
import customerAPI from "./api/customerAPI.js"
import productAPI from "./api/productAPI.js"
import { config } from "dotenv"
import { swaggerOptions } from "./utils/swaggerOptions.js"
import swaggerJsDoc from  "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import bodyParser from 'body-parser';
config()

const app=express()
const PORT = process.env.PORT || 8001
const swaggerDocs = swaggerJsDoc(swaggerOptions);

const startServer=async()=>{
    app.use(cors())
    app.use(json())
    app.use(bodyParser.json())
    app.use(express.json());
    app.use("/customerAPISwagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    app.use('/customerAPI', customerAPI);
    app.use('/productAPI', productAPI);
    app.listen(PORT,(res,req,next)=>{
        console.log(`customer API running on port ${PORT}-`)
    })
    // .on('error',err=>{
    // process.exit()
    // // })
    // app.use(notFound)
}

startServer()

export default app;