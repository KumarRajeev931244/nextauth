import mongoose, { connection } from "mongoose";

export async function dbConnection(){
    try {
        await mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection.on('connected', () => {
            console.log("mongodb connected successfully");
        })
        connection.on('error' , (err) => {
            console.log('mongodb connection error, please make sure db is up and running:' + err);   
            process.exit(1)
        })
        
    } catch (error) {
        console.log("something went wrong while connection with database");
        console.log(error); 
    }
}