import Sequelize from 'sequelize';
import  dotenv from "dotenv";
dotenv.config()

const Database = new Sequelize(process.env.DB,process.env.DB_USERNAME,process.env.DB_PASSWORD, {
    host: process.env.HOST,
    dialect:process.env.DIALECT,
    pool: {
      max: 9,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
  
  Database.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))

  export default Database