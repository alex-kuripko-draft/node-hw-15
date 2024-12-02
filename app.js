import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
}); 

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

    socket.on('chat:message', (msg) => {
        console.log('Message received:', msg);
        socket.emit('chat:response', `Message received: ${msg}`);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
