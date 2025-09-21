import express from "express"
import  { createCourseTable, createInstitute, createStudentTable, createTeacherTable }  from "../../controller/institute/institute.controller"
import isLoggedIn from "../../middleware/middleware"
import asyncErrorHandler from "../../services/asyncErrorHandler"

const router = express.Router()


//before creating an institute, we need to check if the user is logged in
//so we use Middleware
router.route("/").post(asyncErrorHandler(isLoggedIn), asyncErrorHandler(createInstitute), asyncErrorHandler(createTeacherTable), asyncErrorHandler(createStudentTable), asyncErrorHandler(createCourseTable))


 export default router
