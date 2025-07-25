import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./config/connectDB.js";
import cookieParser from 'cookie-parser';
import passport from './lib/passport.js'

import authRouter from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(passport.initialize());


//handling routes
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Listen on port ${PORT}`);
})
