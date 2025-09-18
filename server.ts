 import {config} from "dotenv"
import app from "./src/app";
 config();


//db connection string
import sequelize from "./src/database/connection";

sequelize




 //listening
 function appListen(){
    const port = process.env.PORT || 3000
    app.listen(port , ()=>{
        console.log("server started at port 3000")
    })
 }

appListen()