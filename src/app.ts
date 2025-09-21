import express from "express"
const app =express()
app.use(express.json())

import instituteRoute from "./route/institute/institute.route"

import authRoute from "./route/globals/auth/auth.route"


app.use("/api", authRoute)
app.use("/api/institute", instituteRoute)




export default app