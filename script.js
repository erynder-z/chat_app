//get the server hosted in server.js
const socket = io("http://localhost:3000");

// get data emitted by server
socket.on("chat-message", data => {
    console.log(data);
})