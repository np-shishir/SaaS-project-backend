import {NextFunction, Request, Response} from "express"
import jwt from "jsonwebtoken"
import User from "../database/models/user.model"



interface IExtendedRequest extends Request{
    user:{
        name:string
    }
}


//used in institute.route.ts
//middleware takes request,response and next

class Middleware{
    static isLoggedIn(req:IExtendedRequest, res:Response, next:NextFunction
    ){
        //check if login or not
        //by checking token->identity of a user

        //1.accept token
        console.log("middleware triggered")
        const name= "naidu"

        const token = req.headers.authorization //authorization is the name of token sent
        if(!token){
            res.status(401).json({
                message:"No token received"

            })
            return
        }
        //2.verify token
        //if there is a token
        //.verify takes (token, secretkey):it is given in auth.controller.ts
        jwt.verify(token, 'thisIsSecretKey', async (erroraayo,resultaayo:any)=>{
            if(erroraayo){
                res.status(403).json({
                    message:"Token is invalid"
                })

            }else{
                console.log(resultaayo, "Result")
                       /* const userData = await User.findAll({
                            where:{
                                id:resultaayo.id
                            }
                        })*/
                const userData = await User.findByPk(resultaayo.id)

               if(!userData){
                res.status(404).json({
                    message:"No user with such id"

                })
               }else{
                    //if logged in and user's details found,
                    req.user.name = name



               }
            }
            next()
            
        } )   
        

    }
}



export default Middleware