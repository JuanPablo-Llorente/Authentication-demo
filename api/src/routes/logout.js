// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {User} = require("../db");
const {compare} = require("../controllers/bcrypt");
const {signToken} = require("../controllers/tokens");
const {Op} = require("sequelize");


router.get("/logout", async (req, res) => {
    try
    {
        
    }
    catch(error)
    {
        console.log(error);
    };
});


module.exports = router;