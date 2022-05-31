// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {User} = require("../db");


router.get("/users", async(req, res) => {
    try
    {
        const userNames = await User.findAll({
            attributes: ["userName"],
        });
        const userEmails = await User.findAll({
            attributes: ["email"],
        });
        const userPasswords = await User.findAll({
            attributes: ["password"],
        });
        const users = userNames.concat(userEmails, userPasswords);

        res.send(users);
    }
    catch(error)
    {
        console.log(error);
    };
});


module.exports = router;