import express from "express"
import createInstitute  from "../../controller/institute/institute.controller"
import Middleware from "../../middleware/middleware"
const router = express.Router()


//before creating an institute, we need to check if the user is logged in
//so we use Middleware
router.route("/").post(Middleware.isLoggedIn, createInstitute)


 export default router
