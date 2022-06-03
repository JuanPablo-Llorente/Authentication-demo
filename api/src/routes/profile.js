// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {User} = require("../db");
const {verifyToken} = require("../controllers/tokens");


router.get("/profile", async (req, res, next) => {
    try
    {
        const {authorization} = req.headers;
        
        if(authorization)
        {
            const token = authorization.split(" ").pop();
            const tokenData = await verifyToken(token);
            const userID = tokenData !== undefined ? tokenData.id : null;
            
            if(userID)
            {
                const userInfo = await User.findByPk(userID);
                
                res.send(userInfo);
            }
            else
            {
                res.status(409).send("Invalid token.");
            };
        }
        else
        {
            res.status(401).send("No authorization.");
        };
    }
    catch(error)
    {
        next(error);
    };
});


module.exports = router;