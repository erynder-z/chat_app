//create a server on port 3000
const io = require("socket.io")(3000, {
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"]
  },
});

const runServer = (() => {
  const users = {};

  //broadcast message when recieving send-chat-message
  io.on("connection", socket => {

    logUsers(socket.id, "connected");
    parseMessage(socket);
    parseNewUser(socket);


    //delete socket.id from users on user-disconnect
    socket.on("disconnect", () => {
      logUsers(socket.id, "disconnected")
      deleteUser(socket);

    });
  });

  const logUsers = (id, status) => {
    console.log(`client[${id}] ${status}`);
    console.log('current clients count: ', io.engine.clientsCount);
  }

  const parseMessage = (socket) => {
    socket.on("send-chat-message", message => {
      socket.broadcast.emit("chat-message", {
        message: message,
        userName: users[socket.id]
      });
    });
  }

  const parseNewUser = (socket) => {
    //save connecting users name to socket.id when recieving new-user
    socket.on("new-user", userName => {
      users[socket.id] = userName;
      socket.broadcast.emit("user-connected", userName);
    });
  }

  const deleteUser = (socket) => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  }
})();
