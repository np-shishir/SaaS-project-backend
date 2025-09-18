import {Request, Response} from "express" // for (req,res) in any method
import User from "../../../database/models/user.model"
import bcrypt from "bcrypt"



/*
----REGISTER
    incoming-> username, email, password
    processing/checking -> email valid, compulsory fields
    db query -> insert/update/delete data in db
*/



class AuthController{
    static async registerUser(req:Request, res:Response){

        if(req.body == undefined){
            console.log("triggered")
            res.status(400).json({
                message:"no data seent"
            })
        }
        //take incoming data
        //const username = req.body.username
        const {username, password, email } =req.body
        console.log(req.body)
        

        //if any fields is empty
        if(!username || !password || !email){
            return res.status(400).json({
                message:"Please provide all the details."
            })
            
            
        }
       /*
        const [data]  = await User.findAll({
            where:{
                email
            }
        })
        if(data){
            //email already exists, cannot register again
        }
         */
        
        //insert into User(users) table in db
        await User.create({
            username:username,
            //hash(diff from encrypt) the password
            //higher the hashvalue(salt), higher the time

            password: bcrypt.hashSync(password, 12),
            email:email
        })
        res.status(201).json({
                message:"User created successfully"
        })
        
    }
}

export default AuthController