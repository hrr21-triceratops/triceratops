const express = require('express');
const app = express();
const router = express.Router();
const bodyparser = require('body-parser');
const cors = require('cors');
const route = require('./routes/allRoutes.js');
const morgan = require('morgan');

//Global App Middleware that applies to all routes
app.use(bodyparser());
app.use(cors());
app.use(morgan('dev'));

//Routing and Custom Middleware for each route
app.use('/api', route.userRoutes);
app.use('/api', route.chatRoutes);
app.use('/api', route.expertRoutes);
app.use('/api', route.preferenceRoutes);
app.use('/api', route.ratingRoutes);
app.use('/api', route.categoryRoutes);
app.use('/api', route.searchRoutes);
app.use('/api', route.wishlistRoutes);

//Socket IO Setup
require('./socket.js')(app, express);
