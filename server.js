//create a server on port 3000
const io = require("socket.io")(3000,{
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"]
  },
});

const users = {};


//assign socket to user on connection to server
io.on("connection", socket => {
    socket.on("send-chat-message", message => {
      socket.broadcast.emit("chat-message", message)
    });

    socket.on("new-user", userName => {
      users[socket.id] = userName;
      socket.broadcast.emit("user-connected", userName);
    });
});

//log number of connected clients to server
io.on("connect", () => {
 console.log(io.engine.clientsCount);
});

io.on("disconnect", () => {
  console.log(io.engine.clientsCount);
});