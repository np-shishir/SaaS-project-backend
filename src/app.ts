import express from "express"
const app =express()
app.use(express.json())

import authRoute from "./route/globals/auth/auth.route"


app.use("/api", authRoute)



export default app