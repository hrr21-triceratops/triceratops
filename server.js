const express = require('express');
const app = express();
const router = express.Router();
const bodyparser = require('body-parser');
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes.js');
const expertRoutes = require('./routes/expertRoutes.js');
const userRoutes = require('./routes/userRoutes');

//Global App Routing
app.use(bodyparser());
app.use(cors());

//Routing and Custom Middleware for each route
app.use('/api', chatRoutes);
app.use('/api', expertRoutes);
app.use('/api', userRoutes);

const PORT = 2300;
app.listen(PORT, function(req, res) {
  console.log('listening on port: ' + PORT);
});