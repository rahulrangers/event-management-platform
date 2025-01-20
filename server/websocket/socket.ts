import { Server } from "socket.io";

let io: Server;

export const initializeWebSocket = (server: any): void => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("register", ({ eventId }) => {
      console.log(`User registered for event ${eventId}`);
      io.emit("updateEvent", { eventId, message: "New attendee registered" });
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
    socket.on("connect_error", (error) => {
        console.error("Connection Error:", error);
      });
      
  });
};

export const getIO = (): Server => io;
