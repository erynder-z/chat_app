//get the server hosted in server.js
const socket = io("http://localhost:3000");
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

const userName = prompt("enter your name:");
appendMessage("You joined");
socket.emit("new-user", userName);

//display chat data recieved from server
socket.on("chat-message", data => {
    appendMessage(`${data.userName}: ${data.message}`);
});

//display join message on user connect
socket.on("user-connected", userName => {
    appendMessage(`${userName} joined`);
});

//display disconnect message on disconnect
socket.on("user-disconnected", userName => {
    appendMessage(`${userName} disconnected`);
});


//add eventListener and prevent default page refresh on button press
messageForm.addEventListener("submit", event => {
    event.preventDefault();
    //get value from message input and send that message to the server
    const message = messageInput.value;
    socket.emit("send-chat-message", message);
    appendMessage(`You: ${message}`);
    messageInput.value = ""
});

//display message in clients browser
function appendMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}