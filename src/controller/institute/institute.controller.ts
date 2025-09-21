import { Request, Response } from "express";
import sequelize from "../../database/connection";
import {} from "sequelize"
import generateRandomInstituteNumber from "../../services/generateRandomInstituteNumber";


interface IExtendedRequest extends Request{
    name:string
}

     const createInstitute = async (req:IExtendedRequest, res:Response)=>{
        console.log(req.name)
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




            res.status(200).json({
                message:"Institute created"

            })  



            

    }



    // const createTeacherTable = async (req:Request, res:Response)=>{
    //     //to store data of teachers of a institute, we need instituteNumber of that
    //     //we use middleware
    //     sequelize.query(`CREATE TABLE teacher_${instituteNumber}(
                
    //             id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    //             teacherName VARCHAR(255) NOT NULL,
    //             tecaherEmail VARCHAR(255) NOT NULL UNIQUE,
    //             teacherPhoneNumber VARCHAR(255) NOT NULL UNIQUE
                
    //             )`)
    // }



    export default createInstitute
