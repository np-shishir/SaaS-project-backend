import express from "express"
import isLoggedIn from "../../../middleware/middleware"
import asyncErrorHandler from "../../../services/asyncErrorHandler"
import { createCourse, deleteCourse, getAllCourse, getSingleCourse } from "../../../controller/institute/course/course.controller"

const router = express.Router()


//before creating an institute, we need to check if the user is logged in
//so we use Middleware
router.route("/")
.post(isLoggedIn, asyncErrorHandler(createCourse))
.get( asyncErrorHandler(getAllCourse))




router.route("/:id")
.get(asyncErrorHandler(getSingleCourse))
.delete(isLoggedIn, asyncErrorHandler(deleteCourse))


 export default router
