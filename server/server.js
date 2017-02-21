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


const PORT = 2300;
app.listen(PORT, function(req, res) {
  console.log('listening on port: ' + PORT);
});

///////////////////////////////////
///// Web Socket Server Setup /////
///////////////////////////////////

const WebSocket = require('ws');
const wss = new WebSocket.Server({
  perMessageDeflate: false,
  port: 2400
});

wss.on('connection', function(wsConnect) {
  console.log('New client connected.');

  wsConnect.on('message', function(data) {
    console.log('New message:', data);
    // BROADCAST MESSAGE TO ALL CLIENTS
    wss.clients.forEach(function(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  wsConnect.on('close', function() {
    console.log('Client disconnected.');
  });
});