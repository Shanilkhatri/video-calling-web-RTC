import { Server } from "socket.io";

const io = new Server(3001, {
    cors: {
        origin: "http://localhost:3000",
    },
});
const emailToSocketId = new Map();
const socketIdToEmail = new Map();
io.on("connection", (socket) => {
    console.log("a user connected with id: " + socket.id);
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });

    socket.on("joinRoom", ({ email, room }) => {
        console.log(email," joined room : ",  room);
        emailToSocketId.set(email, socket.id);
        socketIdToEmail.set(socket.id, email);
        socket.join(room);
        io.to(room).emit("userJoinedRoom", {email,id : socket.id}); // inform that someone else joined
        io.to(socket.id).emit("joinRoom",{email,room})
    })
})