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

// QUEUE OF USERS REQUESTING ASSISTANCE
let queue = [];

app.get('/api/userQueue', function(req, res) {
  if (queue.length) {
    res.send(true);
  } else {
    res.send(false);
  }
});

app.get('/api/userQueue/getUser', function(req, res) {
  if (queue.length) {
    var user = queue.shift();
    res.send(user);
  } else {
    res.send('User taken.');
  }
});

io.on('connection', function(socket) {
  console.log('Client Connected:', socket.id);
  socket.emit('id', socket.id);

  socket.on('createRoom', function(room, userId) {
    console.log('Joining Room:', room, 'User:', userId);
    socket.join(room);
    var user = {
      id: userId,
      room: room
    };
    queue.push(user);
    console.log('Current Queue:', queue);
  });



///////////////////////////////////////////

  // socket.on('message', function(message) {
  //   console.log('New Message:', message);
  //   // for a real app, would be room-only (not broadcast)
  //   io.emit('message', message);
  //   // socket.emit('message', message);
  //   // socket.broadcast.emit('message', message);
  // });

  // socket.on('create or join', function(room) {
  //   console.log('Joining Room:', room);
  //   socket.join(room);
  //   console.log('Client ID ' + socket.id + ' created room ' + room);
  //   socket.emit('created', room, socket.id);

    // var numClients = io.sockets.sockets.length;
    // console.log(room + ' has ' + numClients + ' users.');

    // if (numClients === 1) {
    //   socket.join(room);
    //   console.log('Client ID ' + socket.id + ' created room ' + room);
    //   socket.emit('created', room, socket.id);

    // } else if (numClients === 2) {
    //   log('Client ID ' + socket.id + ' joined room ' + room);
    //   io.in(room).emit('join', room);
    //   socket.join(room);
    //   socket.emit('joined', room, socket.id);
    //   io.in(room).emit('ready');

    // } else { // max two clients
    //   socket.emit('full', room);
    // }
  // });

  // socket.on('ipaddr', function() {
  //   var ifaces = os.networkInterfaces();
  //   for (var dev in ifaces) {
  //     ifaces[dev].forEach(function(details) {
  //       if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
  //         socket.emit('ipaddr', details.address);
  //       }
  //     });
  //   }
  // });
});

const PORT = 2300;
server.listen(PORT, function(req, res) {
  console.log('listening on port: ' + PORT);
});