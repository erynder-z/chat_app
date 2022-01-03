const runServer = (() => {

  //create a server on port 3000
  const io = require("socket.io")(3000, {
    cors: {
      origin: "http://127.0.0.1:5500",
      methods: ["GET", "POST"]
    },
  });

  const users = {};

  io.on("connection", socket => {

    logUsers(socket.id, "connected");
    parseMessage(socket);
    parseNewUser(socket);


    socket.on("disconnect", () => {
      logUsers(socket.id, "disconnected")
      deleteUser(socket);

    });
  });

  //log active users to server
  const logUsers = (id, status) => {
    console.log(`client[${id}] ${status}`);
    console.log('current clients count: ', io.engine.clientsCount);
  }
  //broadcast message when recieving send-chat-message
  const parseMessage = (socket) => {
    socket.on("send-chat-message", message => {
      socket.broadcast.emit("chat-message", {
        message: message,
        userName: users[socket.id]
      });
    });
  }

  //save connecting users name to socket.id when recieving new-user
  const parseNewUser = (socket) => {
    socket.on("new-user", userName => {
      users[socket.id] = userName;
      socket.broadcast.emit("user-connected", userName);
    });
  }

  //delete socket.id from users on user-disconnect
  const deleteUser = (socket) => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  }
  
})();
