import express from "express"
import { body } from "express-validator"
import { Login, Logout, Register } from "../controllers/authcontroller.js"
import { observixMiddleware } from "../middleware/observixmiddleware.js"
const router = express.Router()



router.post("/register",[
    body("email").notEmpty().withMessage("Email is Required").isEmail().withMessage("please provide a valid email").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required").isLength({min:6}).withMessage("password must be at least 6 characters long"),
    body("username").notEmpty().trim().escape().withMessage("Username is required")
],Register)

router.post("/login",[
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage('please provide a valid email').normalizeEmail(),
     body("password").notEmpty().withMessage("Password is required").isString().withMessage("Password must be string").isLength({min:6}).withMessage("password must be at least 6 characters long"),
],observixMiddleware("pulse_9938b2b587994b9e"),Login)
router.get("/logout",Logout)

export default router