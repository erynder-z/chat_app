//create a server on port 3000
const io = require("socket.io")(3000,{
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"]
  },
});

const users = {};

//broadcast message when recieving send-chat-message
io.on("connection", socket => {
  console.log(`client[${socket.id}] connected`);
  console.log('current clients count: ', io.engine.clientsCount);
    socket.on("send-chat-message", message => {
      socket.broadcast.emit("chat-message", 
      { 
        message: message,
        userName: users[socket.id]
      });
    });

//save connecting users name to socket.id when recieving new-user
    socket.on("new-user", userName => {
      users[socket.id] = userName;
      socket.broadcast.emit("user-connected", userName);
    });

//delete socket.id from users on user-disconnect
    socket.on("disconnect", () => {
      console.log(`client[${socket.id}] disconnected`);
      console.log('current clients count: ', io.engine.clientsCount);
      socket.broadcast.emit("user-disconnected", users[socket.id]);
      delete users[socket.id];
    });
});