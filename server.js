const express = require('express');
const mqtt = require('mqtt');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const port = 3000;
const server = http.createServer(app);
const io = socketIO(server);

// MQTT broker configuration
const brokerUrl = 'mqtt://35.154.214.132'; // Replace with your MQTT broker's IP address or hostname
const topic = 'ayan'; // Replace with your desired topic

// Create MQTT client
const client = mqtt.connect(brokerUrl);

// Store received data
let receivedData = [];
const maxDataCount = 10; // Maximum number of displayed strings

// MQTT client event handlers
client.on('connect', () => {
  client.subscribe(topic);
});

client.on('message', (topic, message) => {
  receivedData.push(message.toString());
  if (receivedData.length > maxDataCount) {
    receivedData.shift(); // Remove the oldest data if the maximum count is exceeded
  }
  io.emit('data', receivedData.join('\n')); // Emit the received data to all connected clients
});

// Express route to serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Socket.IO connection event handler
io.on('connection', (socket) => {
  console.log('A client connected');
  socket.emit('data', receivedData.join('\n')); // Send the initial data to the connected client

  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


