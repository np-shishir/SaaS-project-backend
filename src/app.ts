import express from "express"
const app =express()
app.use(express.json())

import instituteRoute from "./route/institute/institute.route"

import authRoute from "./route/globals/auth/auth.route"

import courseRoute from "./route/institute/course/course.route"

import studentRoute from "./route/institute/student/student.route"


app.use("/api", authRoute)
app.use("/api/institute", instituteRoute)
app.use("/api/institute/course", courseRoute)
app.use("/api/institute/student", studentRoute)




export default app