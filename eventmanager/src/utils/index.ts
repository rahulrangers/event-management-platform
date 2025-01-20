import { io, Socket } from "socket.io-client";
let socket: Socket | null = null;
export const createwebsocket = (url: string) => {

    if (!socket)  socket = io(url);
    return socket;
} 