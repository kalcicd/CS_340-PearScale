const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const hash = require('pbkdf2-password')();
const uuid = require('uuid/v4');


const {
    getRipePears,
    getFreshPears,
    searchPears,
    createPear,
    getPearById,
    getUserByUsername,
    createAccount,
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
// Setup session handling
app.use(session({
    genid: (req) => uuid(),
    secret: 'swag gang',
    saveUninitialized: true,
    resave: false
}));

const authenticate = async (name, pass) => await new Promise(async (resolve, reject) => {
    const user = await getUserByUsername(name).catch((err) => reject(err));
    if (!user) {
        reject('cannot find user');
    } else {
        hash({password: pass, salt: user.salt}, (err, pass, salt, hash) => {
            if (err) reject(err);
            if (hash === user.hash) resolve(user);
            else reject(Error('Invalid password'));
        });
    }
});

app.get('/', async (req, res) => {
    const search = req.query.search;
    if (search) {
        console.log(`== Searching ${search} pears`);
        const results = await searchPears(search).catch((err) => console.log(err));
        res.render('home', {pears: results});
    } else {
        console.log('== Got request for the home page');
        const freshPears = await getFreshPears().catch((err) => console.log(err));
        res.render('home', {pears: freshPears});
    }
});

app.get('/fresh', async (req, res) => {
    console.log('== Got request for the fresh page');
    const freshPears = await getFreshPears().catch((err) => console.log(err));
    res.render('home', {pears: freshPears});
});

app.get('/ripe', async (req, res) => {
    console.log('== Got request for ripe pears');
    const ripePears = await getRipePears().catch((err) => console.log(err));
    res.render('home', {pears: ripePears});
});

app.get('*', (req, res) => {
    res.send('YOU GOT LOST LOL'); // send the 404 html page with .sendFile() or .render() when you make it, Zach
});

app.post('/createPear', async (req, res) => {
    const body = req.body;
    console.log('== Posting pear');
    const {PID} = await createPear(body).catch((err) => console.log(err));
    res.redirect(`/pears/${PID}`);
});

app.post('/createAccount', async (req, res) => {
    console.log('== Creating User');
    const body = req.body;
    const newAccount = {
        username: body.username,
        birthday: body.birthday,
        email: body.email,
        hash: undefined,
        salt: undefined,
    };
    hash({password: body.password}, async (err, pass, salt, hash) => {
        console.log('test1');
        if (err) throw err;
        newAccount['salt'] = salt;
        newAccount['hash'] = hash;
        await createAccount(newAccount).catch((err) => console.log(err));
        res.redirect('/');
    });

    console.log('test2:', newAccount);

});

app.post('/login', async (req, res) => {
    await authenticate(req.body.username, req.body.password, (err, user) => {
        if (user) {
            req.session.regenerate(() => {
                req.session.user = user;
                req.session.success = `Authenticated as ${user.name}`;
            })
        } else {
            req.session.error = 'Authentication failed, please check your username and password.';
        }
    }).catch((err) => console.log(err));
    res.end();
});

app.get('/logout', async (req, res) => {
    req.session.destroy(() => {
       res.redirect('/');
    });
});


app.get('/pears/:pid', async (req, res) => {
    const PID = req.params.pid;
    const result = await getPearById(PID).catch((err) => console.log(err));
    res.render('pear', {pearInfo: result});
});

app.get('/users/:uid', async (req, res) => {
    const UID = req.params.uid;
    /*
    const user = await getUserByUID(UID).catch((err) => console.log(err));
    const pears = await getPearByUID(UID).catch((err) => console.log(err));;
    res.render('user', {userInfo: result, userPears: pears});
     */
});

const port = process.env.PORT || 6969;


app.listen(port, () => {
    console.log('== Server is listening on port', port);
});
