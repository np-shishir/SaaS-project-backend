import {Sequelize} from "sequelize-typescript"
//no need to import "dotenv" as it is imported in the main file app.ts

//shortcuts for terminal
//sudo xampp start   -->>run mysql
//sudo xampp-manager -->>GUI


const sequelize = new Sequelize({
    database: process.env.DB_NAME as string, //db name
    username: process.env.DB_USERNAME as string, // db username
    password:process.env.DB_PASSWORD as string,  //db password
    host:process.env.DB_HOST as string,  //db ko location
    dialect:"mysql", // which db to use
    port:Number(process.env.DB_PORT),
    models:[__dirname +'/models']
    //models to find all your model classes-> only in 'sequelize-typescript'
    //__dirname -> absolute path of current directory
    //__dirname +'/models' -> points to a folder named models inside the project
    // equivalent to db.books = bookModel(Sequelize, DataTypes)
})  



//auth check
sequelize.authenticate()
.then(()=>{
    console.log("authenticated")
}).catch((err)=>{
    console.log("error occurred ", err)

})



//migration
//force:true -> to add/remove complete data while making a change in column
//alter:true -> to change only column and donot affect data
sequelize.sync({force:false})
.then(()=>{
    console.log("migration successful")

})



export default sequelize