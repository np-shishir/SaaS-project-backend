/*
----REGISTER
    incoming-> username, email, password
    processing/checking -> email valid, compulsory fields
    db query -> insert/update/delete data in db
*/


/*
----LOGIN
    email/username, password (basic):
        -data accept
        -validation-> eg: email existence 
        -verification-> eg:registered user, password check
        -token generation(jwt-json web token)

    google, github, fb (auth)
    email only (SSO)
*/

import {Request, Response} from "express" // for (req,res) in any method
import User from "../../../database/models/user.model"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



class AuthController{
    static async registerUser(req:Request, res:Response){

        
        //take incoming data
        //const username = req.body.username
        const {username, password, email } =req.body
        console.log(req.body)
        

        //if any fields is empty
        if(!username || !password || !email){
            return res.status(400).json({
                message:"Please provide all the details."
            })  
            return 
        }
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
        
    }
    /*---------------------------------------------------------- */



    //login
    static async loginUser(req:Request, res:Response){
        const {email, password} = req.body
        if(!email || !password){
            res.status(400).json({
                message:"Please provide all the credentials"

            })
            return 
        }
        //if all data provided:
        //check if email exists or no
        const data = await User.findAll({     //array
            where:{
                email:email
            }
        })
        if(data.length ==0 || !data[0]){
            //if email doesnt exists
            res.status(404).json({
                message:"Not registered!!"
            })
        }else{
            //if email exists, check the hashed password
            //NOTE: hash value of same password may be diff at diff time
            //we compare through common signature they share
            //compareSync(plain password, hashed registered password)
            const isPasswordMatch = bcrypt.compareSync(password, data[0].password )//gives boolean

            if(isPasswordMatch){
                //login success-> give token
                const token = jwt.sign({id:data[0].id}, "thisIsSecretKey",{
                    expiresIn:"10d"

                })
                res.json({
                    message:"login success",

                    token:token

                })
                

            }else{
                res.status(403).json({
                    message:"Invalid email or password"
                })
            }



        }

    }
}

export default AuthController