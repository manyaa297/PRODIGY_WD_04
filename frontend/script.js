const socket = io('http://localhost:3001'); // Adjust to your backend port
let room = '';

function joinRoom() {
  room = document.getElementById('roomInput').value.trim();
  if (room) {
    socket.emit('join_room', room);
    document.getElementById('joinBox').classList.add('hidden');
    document.getElementById('chatBox').classList.remove('hidden');
  }
}

function sendMessage() {
  const input = document.getElementById('messageInput');
  const msg = input.value.trim();
  if (msg && room) {
    socket.emit('send_message', { room, message: msg });
    appendMessage(`You: ${msg}`);
    input.value = '';
  }
}

socket.on('receive_message', (data) => {
  appendMessage(`Other: ${data.message}`);
});

function appendMessage(message) {
  const msgBox = document.getElementById('messages');
  const msgDiv = document.createElement('div');
  msgDiv.textContent = message;
  msgBox.appendChild(msgDiv);
  msgBox.scrollTop = msgBox.scrollHeight;
}
