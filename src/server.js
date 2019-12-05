const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const {getRipePears, getFreshPears} = require('./dao');
const {middlewareConnect, close} = require('./connection');

const app = express();

// Configure the views
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Setup static content serving
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  console.log('== Got request for the home page');
  const freshPears = await getFreshPears();
  console.log('fresh:', freshPears);
  res.render('home', freshPears);
});

app.get('/fresh', async (req, res) => {
  console.log('== Got request for the fresh page');
  const freshPears = await getFreshPears();
  res.render('home', freshPears);
});

app.get('/ripe', async (req, res) =>{
  console.log('== Got request for ripe pears');
  const ripePears = await getRipePears();
  res.render('home');
});

app.get('*', async (req, res) => {
  res.send('YOU GOT LOST LOL'); // send the 404 html page with .sendFile() or .render() when you make it, Zach
});


const port = process.env.PORT || 6969;


app.listen(port, () => {
  console.log('== Server is listening on port', port);
});
