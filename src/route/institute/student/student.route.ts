import express from "express"
import { getStudents } from "../../../controller/institute/student/student.controller"
import asyncErrorHandler from "../../../services/asyncErrorHandler"

const router = express.Router()


router.route("/")
.get(asyncErrorHandler(getStudents))

 export default router
