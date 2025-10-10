require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./errorMiddleware');

const userRouter = require('./components/user/user-router')
const transactionRouter = require('./components/transaction/transaction-router')


const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const DB_URL = process.env.DB_URL || 'http://localhost:5173';

const app = express()

app.use(express.json());

app.use(cookieParser());

app.use(cors({
    origin: [
        CLIENT_URL,
        'http://localhost:5173',
        'https://qb3sq083-5173.euw.devtunnels.ms'
    ],
    credentials: true
}));

app.use('/user', userRouter);
app.use('/transaction', transactionRouter);


app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => {
            console.log(`Server started on PORT = ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}


start()
