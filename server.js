//create a server on port 3000
const io = require("socket.io")(3000);

//assign socket to user on connection to server
io.on("connection", socket => {
    socket.emit("chat-message", "hello world!")
})
