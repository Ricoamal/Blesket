// Establish a WebSocket connection
const socket = new WebSocket('ws://localhost:3000');

// Handle incoming messages from the server
socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  displayMessage(message);
};

// Send a message to the server
const sendMessage = () => {
  const input = document.getElementById('message-input');
  const message = input.value;

  if (message) {
    const payload = {
      user: 'John',
      message: message
    };
    socket.send(JSON.stringify(payload));
    input.value = '';
  }
};

// Display a message in the chat window
const displayMessage = (message) => {
  const messageList = document.getElementById('message-list');
  const listItem = document.createElement('li');
  listItem.textContent = `${message.user}: ${message.message}`;
  messageList.appendChild(listItem);

  // Scroll to the bottom of the chat window
  messageList.scrollTop = messageList.scrollHeight;
};

// Send a message when the send button is clicked
document.getElementById('send-button').addEventListener('click', sendMessage);

// Send a message when the enter key is pressed in the input field
document.getElementById('message-input').addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    sendMessage();
  }
});
