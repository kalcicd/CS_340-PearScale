const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const {
    getRipePears,
    getFreshPears,
    searchPears,
    createPear,
    getPearById,
} = require('./dao');

const app = express();

// Configure the views
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Setup static content serving
app.use(express.static(path.join(__dirname, 'public')));
// Setup json data handling
app.use(express.json());

app.get('/', async (req, res) => {
    const search = req.query.search;
    if (search) {
        console.log(`== Searching ${search} pears`);
        const results = await searchPears(search).catch((err) => {
            console.log(err);
        });
        res.render('home', {pears: results});
    } else {
        console.log('== Got request for the home page');
        const freshPears = await getFreshPears().catch((err) => {
            console.log(err);
        });
        res.render('home', {pears: freshPears});
    }
});

app.get('/fresh', async (req, res) => {
    console.log('== Got request for the fresh page');
    const freshPears = await getFreshPears().catch((err) => {
        console.log(err);
    });
    res.render('home', {pears: freshPears});
});

app.get('/ripe', async (req, res) => {
    console.log('== Got request for ripe pears');
    const ripePears = await getRipePears().catch((err) => {
        console.log(err);
    });
    res.render('home', {pears: ripePears});
});

app.get('*', async (req, res) => {
    res.send('YOU GOT LOST LOL'); // send the 404 html page with .sendFile() or .render() when you make it, Zach
});

app.post('/createPear', async (req, res) => {
    const body = req.body;
    console.log('== Posting pear');
    await createPear(body).catch((err) => {
        console.log(err);
    });
    res.end()
});

/* Commented out until pear page template is created
app.get('/pears/:pid', async (req, res) => {
    const PID = req.params.pid;
    console.log(`== Got request for pear with pid = ${PID}`);
    const result = await getPearById(PID).catch((err) => {
        console.log(err);
    });
    res.render('pear', {pearInfo: result});
});
*/

const port = process.env.PORT || 6969;


app.listen(port, () => {
    console.log('== Server is listening on port', port);
});
