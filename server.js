const express = require('express');
const mqtt = require('mqtt');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const port = 3000;
const server = http.createServer(app);
const io = socketIO(server);

// MQTT broker configuration
const brokerUrl = 'mqtt://3.110.191.162'; // Replace with your MQTT broker's IP address or hostname
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
  receivedData = [message.toString()]; // Replace the existing data with the new data
  io.emit('data', receivedData.join('\n')); // Emit the received data to all connected clients
});

// Serve static files from the current directory
app.use(express.static(__dirname));
// Express route to serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/new.html');
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
