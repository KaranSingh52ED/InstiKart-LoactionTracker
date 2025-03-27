import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.VITE_CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
app.get("/", (req, res) => {
  res.send("Hello from Vercel backend!");
});

const connectedUsers = new Map();

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  connectedUsers.set(socket.id, {
    id: socket.id,
    location: null,
  });

  socket.on("locationUpdate", (location) => {
    console.log(`Location update from ${socket.id}:`, location);

    if (connectedUsers.has(socket.id)) {
      connectedUsers.get(socket.id).location = location;
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    connectedUsers.delete(socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
