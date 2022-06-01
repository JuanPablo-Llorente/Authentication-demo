// Dependencies
require("dotenv").config();
const {Sequelize} = require("sequelize");
// Files
const modelUser = require("./models/User");
const {DATABASE_URL} = process.env;


const sequelize = new Sequelize(DATABASE_URL, {
    logging: false,
    native: false,
    dialectOptions:
    {
      ssl:
      {
        require: true,
        rejectUnauthorized: false,
      },
    },
});

modelUser(sequelize);

const {User} = sequelize.models;



module.exports =
{
    ...sequelize.models,
    db: sequelize,
};