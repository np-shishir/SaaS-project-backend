//multer config

import { Request } from "express"
import multer from "multer"

//to store any files, we need to use multer and its function diskStorage

//local storage in the device
const storage = multer.diskStorage({

    //cb is a call back function 
    destination:function(req:Request, file:Express.Multer.File, cb:any){
        //destination to store any files
        //cb(error, success)
        cb(null, './src/storage')
    },

    filename: function(req:Request, file:Express.Multer.File, cb:any){
        //to which name is the file is to be stored in the above destination
        cb(null, Date.now() + "-" + file.originalname)

    }   
})

export {multer, storage}