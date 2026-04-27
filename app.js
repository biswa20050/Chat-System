// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "Your API Key",
    authDomain: "Your Auth Domain",
    databaseURL: "Your Database URL",
    projectId: "Your Project ID",
};

// firebase.initializeApp(firebaseConfig);
// var db = firebase.database().ref("messages");

const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat-box");
const typingIndicator = document.getElementById("typing-indicator");

let messageCount = 0;

// Get current time in HH:MM format
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

// Add message to chat
function addMessage(text, isSent = true) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${isSent ? 'sent' : 'received'}`;
    
    const bubble = document.createElement("div");
    bubble.className = "message-bubble";
    bubble.innerText = text;
    
    const timeSpan = document.createElement("span");
    timeSpan.className = "message-time";
    timeSpan.innerText = getCurrentTime();
    
    messageDiv.appendChild(bubble);
    messageDiv.appendChild(timeSpan);
    
    chatBox.appendChild(messageDiv);
    
    // Auto-scroll to bottom
    chatBox.parentElement.scrollTop = chatBox.parentElement.scrollHeight;
    
    messageCount++;
}

// Show typing indicator
function showTypingIndicator() {
    typingIndicator.style.display = "flex";
    chatBox.parentElement.scrollTop = chatBox.parentElement.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
    typingIndicator.style.display = "none";
}

// Send message
function sendMessage() {
    const message = messageInput.value.trim();
    
    if (message === "") return;
    
    // Add user's message
    addMessage(message, true);
    messageInput.value = "";
    messageInput.focus();
    
    // Simulate receiving a response (replace with Firebase code)
    setTimeout(() => {
        showTypingIndicator();
    }, 500);
    
    setTimeout(() => {
        hideTypingIndicator();
        addMessage("Hello! This is an automated response.", false);
    }, 2000);
}

// Event listeners
sendButton.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});

// Firebase integration (uncomment when Firebase credentials are set)
// db.on("child_added", function(snapshot) {
//     let data = snapshot.val();
//     addMessage(data.text, false);
// });