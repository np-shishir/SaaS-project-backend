import { Request, Response } from "express";
import sequelize from "../../../database/connection";
import { IExtendedRequest } from "../../../middleware/type";

const createCourse = async (req:IExtendedRequest, res:Response)=>{

    const {coursePrice, courseName, courseDescription, courseDuration, courseLevel}
    =req.body
    const instituteNumber = req.user?.currentInstituteNumber

    if(!coursePrice || !courseName || !courseDescription || !courseDuration || !courseLevel){
        res.status(400).json({
            message:"Please provide all the details"

        })
    
    }

    const courseThumbnail = null

    const returnedData = await sequelize.query(`INSERT INTO course_${instituteNumber}(coursePrice, courseName, courseDescription, courseDuration, courseLevel, courseThumbnail)
        VALUES(?, ?, ?, ?, ?)`, {
            replacements:[coursePrice, courseName, courseDescription, courseDuration, courseLevel, courseThumbnail ]
        })
        console.log(returnedData)
        res.status(200).json({
            message:"Course created successfully"

        })
}

const deleteCourse = async (req:IExtendedRequest, res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber
    const courseId = req.params.id

    //first check if the course exists in the db
    const [courseData] = await sequelize.query(`SELECT * FROM course_${instituteNumber} WHERE id=${courseId}`)
    if(courseData.length ==0){
        return res.status(404).json({
            message:"No course found"
        })
    }


    await sequelize.query(`DELETE FROM course_${instituteNumber} WHERE id=${courseId}`)

    res.status(200).json({
        message:"Course deleted successfully"
    })

}

const getAllCourse = async (req:IExtendedRequest, res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber
    
    const courses = await sequelize.query(`SELECT * FROM course_${instituteNumber}`)
    res.status(200).json({
        message:"Courses fetched",
        data : courses 
    })

}

const getSingleCourse = async  (req:IExtendedRequest, res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber
    const courseId = req.params.id

    const course = await sequelize.query(`SELECT * FROM course_${instituteNumber} WHERE id = ${courseId}`)
    res.status(200).json({
        message:"Singlr course fetched",
        data:course
    })
}
export {createCourse, deleteCourse, getAllCourse, getSingleCourse}