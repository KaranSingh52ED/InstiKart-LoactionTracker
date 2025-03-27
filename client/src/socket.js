import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_SOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Socket event listeners
socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("error", (error) => {
  console.error("Socket error:", error);
});

// Function to connect socket manually
export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

// Function to disconnect socket manually
export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};
