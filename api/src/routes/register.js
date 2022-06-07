// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {User} = require("../db");
const {encrypt} = require("../controllers/bcrypt");
const {ADMIN_PASSWORD} = process.env;


router.post("/register", async (req, res) => {
    const {name, lastName, userName, email, password} = req.body;
    const foundUser = await User.findAll({
        where:
        {
            userName: userName,
        },
    });
    const foundEmail = await User.findAll({
        where:
        {
            email: email,
        },
    });
    
    try
    {
        if(foundUser.length)
        {
            res.status(404).send("This username isn't available. Please try another.");
        }
        else if(foundEmail.length)
        {
            res.status(404).send("This email is already in use available. Please try another.");
        }
        else
        {
            if(name, lastName, userName, email, password)
            {
                const passwordHash = await encrypt(password);
                var admin = false;
                
                if(password === ADMIN_PASSWORD)
                {
                    admin = true;
                };
                
                await User.create({
                    name,
                    lastName,
                    userName,
                    email,
                    password: passwordHash,
                    is_Admin: admin,
                });
                
                res.send("User created successfully.");
            }
            else
            {
                res.status(404).send("All fields are required.");
            };
        };
    }
    catch(error)
    {
        console.log(error);
    };
});


module.exports = router;