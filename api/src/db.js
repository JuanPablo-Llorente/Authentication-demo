// Dependencies
require("dotenv").config();
const {Sequelize} = require("sequelize");
// Files
const modelUser = require("./models/User");
const {DB_USER, DB_PASSWORD, DB_HOST} = process.env;


const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/authentication`, {
    logging: false,
});

modelUser(sequelize);

const {User} = sequelize.models;



module.exports =
{
    ...sequelize.models,
    db: sequelize,
};