import { log } from "console";
import mongoose, { mongo } from "mongoose";

type ConnectionObject = {
    isConnected? : number
}

const connection : ConnectionObject = {}

export async function dbConnect() : Promise<void> {

    if(connection.isConnected){
        console.log("already connected to db successfully")
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI || "" , {}) // try logging db object

        connection.isConnected = db.connections[0].readyState
        console.log("db connection successfully")
    } catch (error) {
        console.log("database connection unsuccessful")
        process.exit(1)
    }
}