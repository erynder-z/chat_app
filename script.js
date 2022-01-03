const runClient = (() => {

//get the server hosted in server.js
const socket = io("http://localhost:3000");
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

const getUserName = (() => {
    const userName = prompt("enter your name:");
    appendMessage("You joined", "join");
    socket.emit("new-user", userName);
})();

const handleEvents = (() => {
//display chat data recieved from server
socket.on("chat-message", data => {
    appendMessage(`${data.userName}: ${data.message}`, "other");
});

//display join message on user connect
socket.on("user-connected", userName => {
    appendMessage(`${userName} joined`, "join");
});

//display disconnect message on disconnect
socket.on("user-disconnected", userName => {
    appendMessage(`${userName} disconnected`, "leave");
});
})();


//add eventListener and prevent default page refresh on button press
const sendMessage = (() => {
    messageForm.addEventListener("submit", event => {
        event.preventDefault();
        //get value from message input and send that message to the server
        const message = messageInput.value;
        socket.emit("send-chat-message", message);
        appendMessage(`You: ${message}`, "me");
        messageInput.value = "";
    });
})();


//display message in clients browser
function appendMessage(message, cssClass) {
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageContainer.append(messageElement);
    messageElement.classList.add("msg");
    messageElement.classList.add(cssClass);
}

//disconnect socket
const disconnectSocket = (() => {
    const disconnect = document.getElementById("logoutBtn");
    disconnect.addEventListener("click", () => {
        socket.disconnect();
        alert("disconnected");
    });
})();

//Create a switch do toggle theme.
const darkMode = (() => {
    const toggleDarkmode = document.getElementById("darkmodeBtn");
    toggleDarkmode.addEventListener("click", () => {
        changeTheme();
    });
})();

//Change theme  for Header, Body and Footer sections.
const changeTheme = () => {
    const top = document.getElementById("top");
    const middle = document.getElementById("message-container");
    const lower = document.getElementById("lower");

        top.classList.toggle("darkmode");
        middle.classList.toggle("darkmode");
        lower.classList.toggle("darkmode");
 
}

})();