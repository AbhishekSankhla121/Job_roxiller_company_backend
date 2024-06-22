// Global imports
import express from "express";
import { config } from "dotenv"
import cors from "cors";



// Local imports 
import ErrorMiddelware from "./middelwares/Error.js";
import infoRouter from "./routes/infoRouter.js"
// using of Config 
// for accessing the enviroment Variales
config({
    path: "./config/config.env"
});

const app = express();
app.use(cors());
app.use(express.json())
// checking server 
app.get("/", (req, res, next) => {
    res.status(200).send(`<h1>server is working... <br> please check frontend <a href='${process.env.FRONTEND_URL}' style="text-decoration: none;"> Click Here</a><h1>`);
});

app.use("/api/v1", infoRouter);
export default app;

// cutom error handling 
app.use(ErrorMiddelware);