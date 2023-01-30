import db  from '../config/Database.js';
import Sequelize from 'sequelize';
 const User = db.define('User', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: "id"
        },
        email: {
            type: Sequelize.STRING,
            defaultValue: null,
            allowNull: false,
            field: "email",
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: Sequelize.STRING,
            defaultValue: null,
            allowNull: false,
            field: "password",
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

// User.sync().
//     then(() => {
//         console.log("Customer table created")
//     })
//     .catch(error =>
//         console.error(error))

export default User;
