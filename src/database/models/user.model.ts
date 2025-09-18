
import {Table, Column, Model, DataType, PrimaryKey} from "sequelize-typescript"




@Table({      //decorator to create a table
    tableName: 'users', //table name for GUI(phpmyadmin) 
    modelName : 'User',  //name to access the table in the code
    timestamps:true  // adds createdAt & updatedAt automatically
})




class User extends Model{ //class User inherits from Sequelize's Model class to access all properties of Sequelize model

    @Column({
        primaryKey :true, //instead of ID(i.e. primaryKey)
        type: DataType.UUID,
         //we use UUID instead of the default ID as ID is guessable but UUID is a 128bit unguessable value
        defaultValue:DataType.UUIDV4
    })
    declare id:string



    @Column({          //decorator to create a column
        type:DataType.STRING
    })
    declare username:string //name of column:userName



    @Column({
        type:DataType.STRING
        
    })
    declare password:string   //name of column:password
   

    
    @Column({
        type:DataType.STRING,
        unique:true
        
    })
    declare email:string    //name of column:email



    @Column({
        type: DataType.ENUM('teacher', 'institute', 'super-admin', 'student'),
        //with datatype as enum, column can only have one value from the fixed list
        //eg:type:'manager' isnot allowed
        defaultValue: 'student',
    })
    declare role:string
}

export default User  //export the class