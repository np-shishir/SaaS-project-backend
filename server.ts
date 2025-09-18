 //always import at top
 import {config} from "dotenv"
  config();

import app from "./src/app"
import "./src/database/connection"







 //listening
 function appListen(){
    const port = process.env.PORT || 3000
    app.listen(port , ()=>{
        console.log("server started at port 3000")
    })
 }

appListen()