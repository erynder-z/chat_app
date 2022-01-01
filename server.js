//create a server on port 3000
const io = require("socket.io")(3000,{
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"]
  },
});

//assign socket to user on connection to server
io.on("connection", socket => {
    socket.emit("chat-message", "hello world!");
});
