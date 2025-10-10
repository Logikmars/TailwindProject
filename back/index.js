require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const WebSocket = require('ws');
const errorMiddleware = require('./errorMiddleware');

const userRouter = require('./components/user/user-router');
const transactionRouter = require('./components/transaction/transaction-router');

const transactionService = require('./components/transaction/transaction-service');

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const DB_URL = process.env.DB_URL;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [CLIENT_URL, 'http://localhost:5173'],
  credentials: true,
}));

app.use('/user', userRouter);
app.use('/transaction', transactionRouter);
app.use(errorMiddleware);

// --- MongoDB
mongoose.connect(DB_URL).then(() => console.log('MongoDB connected ✅'));

// --- Express + WebSocket
const server = app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));

// --- WebSocket сервер
const wss = new WebSocket.Server({ server });
global.WS_CLIENTS = new Map();

wss.on('connection', (ws, req) => {
  const params = new URLSearchParams(req.url.split('?')[1]);
  const token = params.get('token');
  if (!token) return ws.close();

  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    global.WS_CLIENTS.set(userData.email, ws);
    console.log(`🟢 ${userData.email} connected via WebSocket`);

    ws.on('close', () => {
      global.WS_CLIENTS.delete(userData.email);
      console.log(`🔴 ${userData.email} disconnected`);
    });
  } catch (err) {
    console.log('❌ Invalid token');
    ws.close();
  }
});
