const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

// const dao = require('./dao');
const {middlewareConnect, close} = require('./connection');

const app = express();

// Configure handlebars
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs'
});

// Configure the views
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(path.basename(__dirname), 'views'));

// Setup static content serving
app.use(express.static(path.join(path.basename(__dirname), 'public')));

app.get('/', middlewareConnect, (req, res) => {
  console.log('== Got request for the home page');
  res.render('home');

  close(req.db);
  req.db = undefined;
});

app.get('*', (req, res) => {
  res.send('YOU GOT LOST LOL'); // send the 404 html page with .sendFile() when you make it, Zach
});


/**
 * Capture the port configuration for the server. We use the PORT environment
 * variable's value, but if it is not set, we will default to port 3000.
 */
const port = process.env.PORT || 3000;

/**
 * Start the server.
 */
app.listen(port, () => {
  console.log('== Server is listening on port', port);
});
