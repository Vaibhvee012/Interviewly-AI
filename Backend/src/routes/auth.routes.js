const {Router} = require("express")
const authController = require("../controllers/auth.controller")
const authRouter = Router()
const authMiddleware = require("../middlewares/auth.middleware")
/**
 * @route POST /api/auth/register
 * @description Register new user
 * @access public
 */
authRouter.post("/register",authController.registerUserController)
    
 

/**
 * @route POST /api/auth/login
 * @description login user with email and password
 * @access public
 */
authRouter.post("/login", authController.loginUserController);


/**
 * @route POST /api/auth/logout
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */


authRouter.post("/logout", authController.logoutUserController);



/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access private
*/

authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController);


module.exports = authRouter