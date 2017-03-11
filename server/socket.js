/////////////////////////////////////
////////// SOCKET.IO SETUP //////////
/////////////////////////////////////

module.exports = function(app, express) {
  console.log('SOCKET APP', app, express);
  const os = require('os');
  const server = require('http').createServer(app);
  const io = require('socket.io')(server);

  // QUEUE OF USERS REQUESTING ASSISTANCE
  let realQueue = {};

  // DETERMINE IF USER CURRENTLY IN QUEUE
  app.get('/api/userQueue', function(req, res) {
    if (Object.keys(realQueue).length) {
      res.send(true);
    } else {
      res.send(false);
    }
  });

  // ALLOW USER TO CYCLE THROUGH USERS IN QUEUE
  app.get('/api/userQueue/loadUser', function(req, res) {
    console.log("REAL QUEUE", realQueue);
    if (Object.keys(realQueue).length) {
      res.send(realQueue);
    } else {
      res.send({ noUser: { username: 'No users at this time' } });
    }
  });

  // REMOVE A USER FROM THE QUEUE
  app.get('/api/userQueue/loadUser/:id', function(req, res) {
    delete realQueue[req.params.id];
    if (!realQueue[req.params.id]) {
      res.send('Success');
    } else {
      res.send('ERROR');
    }
  });

  // RUNS WHEN USER STARTS A SOCKET CONNECTION
  io.on('connection', function(socket) {
    console.log('Client Connected:', socket.id);
    socket.emit('id', socket.id);

    // RUNS WHEN USER CREATES CHATROOM
    socket.on('createRoom', function(room, userId, category, username, profileImage) {
      console.log('Joining Room:', room, 'User:', userId, 'Category:', category, 'username:', username);
      socket.join(room);
      var user = {
        id: userId,
        room: room,
        category: category,
        username: username,
        profileImage: profileImage
      };
      realQueue[user.id] = user;
      console.log('Current Real Queue:', realQueue);
    });

    // RUNS WHEN EXPERT JOINS CHATROOM
    socket.on('joinRoom', function(room, expertId, expertUsername, expertImage) {
      console.log('Joining Room:', room);
      socket.join(room);
      io.in(room).emit('expert', expertId, expertUsername, expertImage);
    });

    // RUNS WHEN MESSAGE IS SENT BY USER OR EXPERT
    socket.on('message', function(message, room) {
      console.log('New Message:', message, 'in Room:', room);
      io.in(room).emit('message', message);
    });

    // RUNS WHEN CLIENT DISCONNECTS
    socket.on('showRate', function(room) {
      console.log("Client disconnected, SHOW RATE");
      console.log("EMITTING RATE");
      io.in(room).emit('rate');
    });
  });

  const PORT = process.env.PORT || 2300;
  server.listen(PORT, function(req, res) {
    console.log('listening on port: ' + PORT);
  });
};
