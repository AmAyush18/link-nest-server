import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { ErrorMiddleware } from './middlewares/error.js';
import cors from "cors";

export const app = express();

dotenv.config();


//body parser
app.use(express.json({limit: "50mb"}));

//cookie parser
app.use(cookieParser());

// cors => cross origin resource sharing
app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
    })
);

// routes
// app.use(
//     "/api/v1", 
// );

// testing api
app.get("/test", (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "API is working"
    })
});

// unknow route
app.all("*", (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server!`);
    err.statusCode = 400;
    next(err);
});

app.use(ErrorMiddleware);