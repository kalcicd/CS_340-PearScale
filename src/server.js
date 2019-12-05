const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const {getTopPears, getFreshPears} = require('./dao');
const {middlewareConnect, close} = require('./connection');

const app = express();

// Configure the views
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Setup static content serving
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', middlewareConnect, async (req, res) => {
  console.log('== Got request for the home page');
  const freshPears = await getFreshPears(req.db);
  res.render('home', freshPears);
  close(req.db);
  req.db = undefined;
});

app.get('/fresh', middlewareConnect, async (req, res) => {
  console.log('== Got request for the fresh page');
  const freshPears = await getFreshPears(req.db);
  res.render('home', freshPears);
  close(req.db);
  req.db = undefined;
});

app.get('/ripe', middlewareConnect, async (req, res) =>{
  console.log('== Got request for top pears');
  const topPears = await getTopPears(req.db);
  console.log('topPears:', topPears);
  res.render('home');
  close(req.db);
  req.db = undefined;
});

app.get('*', async (req, res) => {
  res.send('YOU GOT LOST LOL'); // send the 404 html page with .sendFile() when you make it, Zach
});


/**
 * Capture the port configuration for the server. We use the PORT environment
 * variable's value, but if it is not set, we will default to port 6969.
 */
const port = process.env.PORT || 6969;

/**
 * Start the server.
 */
app.listen(port, () => {
  console.log('== Server is listening on port', port);
});
