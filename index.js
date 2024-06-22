import app from "./app.js";
import ConnectToDB from "./config/db.js";
ConnectToDB()

// listing the port aT LOCALHOST:3000   
app.listen(`${process.env.PORT}`, () => {
    console.log(`\nServer is Running...\nListen Port at: http://localhost:${process.env.PORT}\n\nyour Backend Url: ${process.env.BACKEND_URL}`)
})