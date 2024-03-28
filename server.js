import express from 'express';
import dotenv from 'dotenv';
import { init } from './config/dbConfig.js';
import userRouter from './routes/userRoute.js';

init();
dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/user', userRouter)
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));