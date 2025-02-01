import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import financialRecordRouter from './src/routes/finanical-records';

dotenv.config();

const app: Express = express();
const port: string | undefined = process.env.PORT;


// ✅ Move this above all routes and middleware
const allowedOrigins = [
    'http://localhost:5173', // Check if this matches your Vite frontend
    'http://localhost:5174',
    'http://localhost:5137',
];


app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());


app.options('*', (req, res) => {
    res.status(204).end();
});

app.use("/financial-records", financialRecordRouter);

const mongoURI: string | undefined = process.env.MONGODB_DATABASE_URL;

if (!mongoURI) {
    throw new Error('MONGODB_DATABASE_URL not available');
}

mongoose
    .connect(mongoURI)
    .then(() => console.log(`CONNECTED TO MONGODB!`))
    .catch((error) => console.log("Failed to Connect to MongoDB:", error));



app.listen(port, () => {
    console.log(`Server Running on Port ${port}`);
});
