
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './config/database.js'; 
import authrouter from './routers/authRoutes.js';
import taskRoutes from './routers/taskRoutes.js';

dotenv.config();
const app = express();
const server = http.createServer(app);

//  CORS applied for both HTTP and Socket.IO
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
    credentials: true,
  },
});

//  Connect DB
connectDB();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

//  Pass io to routes
app.set('io', io);
app.use('/api/auth', authrouter);
app.use('/api/tasks', taskRoutes(io)); 

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
