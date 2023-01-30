import SequelizeMock from 'sequelize-mock';
import User from "../../../models/User.js"
// Setup the mock database connection
var DBConnectionMock = new SequelizeMock(User);

// Define our Model
var UserMock = DBConnectionMock.define("User", {
    'id': "1",
    'email': 'email@example.com',
    'password':'pass'
}
);