const runClient = (() => {

//get the server hosted in server.js
const socket = io("http://localhost:3000");
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

const getUserName = (() => {
    const userName = prompt("enter your name:");
    appendMessage("You joined");
    socket.emit("new-user", userName);
})();

const handleEvents = (() => {
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
})();


//add eventListener and prevent default page refresh on button press
const sendMessage = (() => {
    messageForm.addEventListener("submit", event => {
        event.preventDefault();
        //get value from message input and send that message to the server
        const message = messageInput.value;
        socket.emit("send-chat-message", message);
        appendMessage(`You: ${message}`);
        messageInput.value = ""
    });
})();


//display message in clients browser
function appendMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}

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