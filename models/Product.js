import db  from '../config/Database.js';
import Sequelize from 'sequelize';
const Product = db.define('Product', {

        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: "id"
        },
        product_name: {
            type: Sequelize.STRING,
            defaultValue: null,
            allowNull: false,
            field: "product_name",
            validate: {
                notEmpty: true
            }
        },
        product_price: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: false,
            field: "product_price",
            validate: {
                notEmpty: true
            }
        },
        product_warranty: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: false,
            field: "product_warranty",
            validate: {
                notEmpty: true
            }
        },
   
    },
    {
        freezeTableName: true,
        underscored: true,
        timestamps: false
    }
);

Product.sync().
    then(() => {
        console.log("table created")
    })
    .catch(error =>
        console.error(error))

export default Product