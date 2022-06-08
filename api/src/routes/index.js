// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const register = require("./register");
const login = require("./login");
const profile = require("./profile");
const users = require("./users");
const forgotPassword = require("./forgotPassword");
const resetPassword = require("./resetPassword");


// Configurar los routers
router.use(register);
router.use(login);
router.use(profile);
router.use(users);
router.use(forgotPassword);
router.use(resetPassword);


module.exports = router;