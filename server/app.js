import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import Router from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();
connectDB();
const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true, limit: '500mb' }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1', Router);
app.listen(process.env.PORT, () => {
  console.log(`Server Started at ${process.env.PORT}`);
});
