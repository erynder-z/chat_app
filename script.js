//get the server hosted in server.js
const socket = io("http://localhost:3000");
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

const userName = prompt("enter your name:");
appendMessage("You joined");
socket.emit("new-user", userName);

//get chat-data emitted by server
socket.on("chat-message", data => {
    appendMessage(data);
});

//get user-data emitted by server
socket.on("user-connected", userName => {
    appendMessage(`${userName} joined`);
});


//add eventListener and prevent default page refresh on button press
messageForm.addEventListener("submit", event => {
    event.preventDefault();
    //get value from message input and send that message to the server
    const message = messageInput.value;
    socket.emit("send-chat-message", message);
    messageInput.value = ""
});

//display in clients browser
function appendMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}