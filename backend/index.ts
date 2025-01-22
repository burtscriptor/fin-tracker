import express, {Express} from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import finanicalRecordRouter from './src/routes/finanical-records'


const app: Express = express();
dotenv.config();
const port: string | undefined = process.env.PORT ;

app.use(express.json());

const mongoURI: string | undefined = process.env.MONGODB_DATABASE_URL;


if (!mongoURI) {
    throw new Error('MONGODB_DATABASE_URL not available')
    
};

mongoose
.connect(mongoURI)
.then(()=> console.log(`CONNECTED TO MONGODB!`))
.catch((error)=> console.log("Failed to Connect to MongoDB:", error));

app.use("/finanical-records", finanicalRecordRouter);

app.listen(port, ()=> {
    console.log(`Sever Running on Port ${port}`)
})