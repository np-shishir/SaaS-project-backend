import { NextFunction, Request, Response } from "express";
import sequelize from "../../database/connection";
import {} from "sequelize"
import generateRandomInstituteNumber from "../../services/generateRandomInstituteNumber";
import { IExtendedRequest } from "../../middleware/type";
import User from "../../database/models/user.model";



     const createInstitute = async (req:IExtendedRequest, res:Response, next:NextFunction)=>{
        console.log(req.user, "was r3eceived")

        
        const {instituteName, instituteEmail, institutePhoneNumber, instituteAddress} = req.body

        const instituteVatNo = req.body.instituteVatNo || null
        const institutePanNo = req.body.institutePanNo || null

        if(!instituteName || !instituteEmail || !institutePhoneNumber || !instituteAddress){
            res.status(400).json({
                message:"Please provide all the details."
            })
            return
        }

        

        // if all details provided:,
        //if table created as user.model.ts-> it is static and for a single table
        //but we need separate table for each
        const instituteNumber = generateRandomInstituteNumber()
        await sequelize.query(`CREATE TABLE IF NOT EXISTS institute_${instituteNumber} (

            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,

            instituteName VARCHAR(255) NOT NULL,

            instituteEmail VARCHAR(255) NOT NULL UNIQUE,

            institutePhoneNumber VARCHAR(255) NOT NULL UNIQUE,

            instituteAddress VARCHAR(255) NOT NULL,

            institutePanNo VARCHAR(255),
            instituteVatNo VARCHAR(255),

            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

            
            )`)

            //add data to the table
            await sequelize.query(`INSERT INTO institute_${instituteNumber}(
                instituteName, instituteEmail, institutePhoneNumber, instituteAddress, institutePanNo, instituteVatNo
            ) VALUES(?, ?, ?, ?, ?, ?)`, {
                replacements:[instituteName, instituteEmail, institutePhoneNumber, instituteAddress, institutePanNo, instituteVatNo ]
            })

            //create a table that stores all the institutes a user has created:
            await sequelize.query(`CREATE TABLE IF NOT EXISTS user_institute(
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
            userId VARCHAR(255) REFERENCES users(id), 
            instituteNumber INT UNIQUE 
            )`)

            if(req.user){
            await sequelize.query(`INSERT INTO user_institute(userId,instituteNumber) VALUES(?,?)`,{
                replacements : [req.user.id,instituteNumber]
            })




            if(req.user){
                // const user = User.findByPk(req.user.id)
                // user?.currentInstituteNumber = instituteNumber
                // await user?.save()

                await User.update({
                    role:'institute',
                    currentInstituteNumber : instituteNumber
                }, {
                    where:{
                        id:req.user.id
                    }
                })

            }
            req.instituteNumber = instituteNumber
            next()



            

    }
}



    const createTeacherTable = async (req:IExtendedRequest, res:Response, next:NextFunction)=>{
        //to store data of teachers of a institute, we need instituteNumber of that
        //we use middleware
        const instituteNumber = req.instituteNumber
        await sequelize.query(`CREATE TABLE IF NOT EXISTS teacher_${instituteNumber}(
                
                id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                teacherName VARCHAR(255) NOT NULL,
                teacherEmail VARCHAR(255) NOT NULL UNIQUE,
                teacherPhoneNumber VARCHAR(255) NOT NULL UNIQUE,
                teacherExpertise VARCHAR(255) ,
                joinedDate DATE  ,
                salary VARCHAR(100) ,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 

                
                )`)
                next()
                
    }


    const createStudentTable = async (req:IExtendedRequest, res:Response, next:NextFunction)=>{
        const instituteNumber = req.instituteNumber
        await sequelize.query(`CREATE TABLE IF NOT EXISTS student_${instituteNumber}(
            
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            studentName VARCHAR(255) NOT NULL,
            studentPhoneNumber VARCHAR(255) NOT NULL UNIQUE,
            studentAddress TEXT ,
            studentImage VARCHAR(255) ,
            enrolledDate TIME ,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
           
            
            )`)
            next()
    }

    const createCourseTable = async (req:IExtendedRequest, res:Response)=>{
        const instituteNumber = req.instituteNumber
        await sequelize.query(`CREATE TABLE IF NOT EXISTS course_${instituteNumber}(
                id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                courseName VARCHAR(255) ,
                coursePrice VARCHAR(255) ,
                courseDescription TEXT,
                courseDuration  VARCHAR(100),
                courseThumbnail VARCHAR(255),
                courseLevel ENUM('Beginner', 'Intermediate', 'Advanced')

            )`)
            res.status(200).json({
                message:"Institute, teacher and course created"

            })
    }



    export {createInstitute, createTeacherTable, createStudentTable, createCourseTable}
