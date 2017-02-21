const express = require('express');
const app = express();
const router = express.Router();
const bodyparser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes.js');
const expertRoutes = require('./routes/expertRoutes.js');
const preferenceRoutes = require('./routes/preferenceRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const morgan = require('morgan');

//Global App Middleware that applies to all routes
app.use(bodyparser());
app.use(cors());
app.use(morgan('dev'));

//Routing and Custom Middleware for each route
app.use('/api', userRoutes);
app.use('/api', chatRoutes);
app.use('/api', expertRoutes);
app.use('/api', preferenceRoutes);
app.use('/api', ratingRoutes);
app.use('/api', categoryRoutes);


// MOVED UNDER SOCKET.IO SETUP
// const PORT = 2300;
// app.listen(PORT, function(req, res) {
//   console.log('listening on port: ' + PORT);
// });

/////////////////////////////////////
////////// SOCKET.IO SETUP //////////
/////////////////////////////////////

const os = require('os');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', function(socket) {
  console.log('Client connected...');

  socket.on('join', function(data) {
    console.log('Client joined:', data);
    socket.emit('messages', 'Hello from server.');
  });

  socket.on('messages', function(data) {
    socket.emit('broad', data);
    socket.broadcast.emit('broad', data);
  });

  // socket.on('create or join', function(room) {
  //   log('Received request to create or join room ' + room);

  //   var numClients = io.sockets.sockets.length;
  //   log('Room ' + room + ' now has ' + numClients + ' client(s)');

  //   if (numClients === 1) {
  //     socket.join(room);
  //     log('Client ID ' + socket.id + ' created room ' + room);
  //     socket.emit('created', room, socket.id);

  //   } else if (numClients === 2) {
  //     log('Client ID ' + socket.id + ' joined room ' + room);
  //     io.sockets.in(room).emit('join', room);
  //     socket.join(room);
  //     socket.emit('joined', room, socket.id);
  //     io.sockets.in(room).emit('ready');

  //   } else { // max two clients
  //     socket.emit('full', room);
  //   }
  // });

  socket.on('ipaddr', function() {
    var ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
      ifaces[dev].forEach(function(details) {
        if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
          socket.emit('ipaddr', details.address);
        }
      });
    }
  });
});

server.listen(2300);

///////////////////////////////////
///// Web Socket Server Setup /////
///////////////////////////////////

// const WebSocket = require('ws');
// const wss = new WebSocket.Server({
//   perMessageDeflate: false,
//   port: 2400
// });

// wss.on('connection', function(wsConnect) {
//   console.log('New client connected.');

//   wsConnect.on('message', function(data) {
//     console.log('New message:', data);
//     // BROADCAST MESSAGE TO ALL CLIENTS
//     wss.clients.forEach(function(client) {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(data);
//       }
//     });
//   });

//   wsConnect.on('close', function() {
//     console.log('Client disconnected.');
//   });
// });