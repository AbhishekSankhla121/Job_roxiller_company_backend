import mongoose from "mongoose";

const ConnectToDB = async () => {
    try {
        console.log("Try Connect to DataBase ...")
        const { connection } = await mongoose.connect(`${process.env.DATABASE_URL}`);

        console.log("\nConnect to database Suscessfully..\nConnect MongoDB with :", connection.host, "\n");
    } catch (error) {
        console.log("Error in Database Connection ", error)
    }
}

export default ConnectToDB;