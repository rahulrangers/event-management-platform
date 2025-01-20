import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import eventRoutes from './routes/eventRoutes';
import connectDB from './utils/db';
import { initializeWebSocket } from './websocket/socket';
import { configureCloudinary } from './utils/imgconfig';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const server = http.createServer(app);

initializeWebSocket(server);
configureCloudinary();
connectDB();
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);



const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
