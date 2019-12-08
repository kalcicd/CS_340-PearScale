const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const hash = require('pbkdf2-password')();


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

// Setup session handling
app.use(session({
    secret: 'swag gang',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 60, // 1 hour
        sameSite: true,
        secure: false
    }
}));
// Setup static content serving
app.use(express.static(path.join(__dirname, 'public')));
// Setup json data handling
app.use(express.json());

const authenticate = async (name, pass) => await new Promise(async (resolve, reject) => {
    const user = await getUserByUsername(name).catch((err) => reject(err));
    if (!user) {
        reject('cannot find user');
    } else {
        hash({password: pass, salt: user.salt}, (err, pass, salt, hash) => {
            if (err) reject(err);
            if (hash === user.hash) resolve(user);
            else reject('Invalid password');
        });
    }
}).catch((err) => console.log(err));

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
    res.send('YOU GOT LOST LOL');
});

app.post('/createPear', async (req, res) => {
    if (req.session.user) {
        const body = req.body;
        body.UID = req.session.user.UID;
        console.log('== Posting pear');
        const {PID} = await createPear(body).catch((err) => console.log(err));
        res.redirect(`/pears/${PID}`);
    } else {
        console.log('user is undefined:');
        res.end();
    }
});

app.post('/createAccount', async (req, res) => {
    console.log('== Creating User');
    const body = req.body;
    const newAccount = {
        username: body.username,
        birthday: body.birthday,
        email: body.email,
    };
    hash({password: body.password}, async (err, pass, salt, hash) => {
        if (err) throw err;
        newAccount['salt'] = salt;
        newAccount['hash'] = hash;
        await createAccount(newAccount).catch((err) => {
            if (err.errno === 1062) console.log('Username is already taken');
            // todo display errors when creating account on modal
            else console.log(err);
        });
        res.redirect('/');
    });
});

app.post('/login', async (req, res) => {
    const user = await authenticate(req.body.username, req.body.password);
    if (!user) {
        req.session.error = 'Authentication failed, please check your username and password.';
        console.log(req.session.error);
        res.end();
    } else {
        req.session.regenerate(() => {
            req.session.user = user;
            req.session.success = `== Authenticated as ${req.session.user.Username}`;
            console.log(req.session.success);
            console.log(req.session.user);
            req.session.save(() => {
                res.end();
            });
        });
    }

});

app.post('/logout', async (req, res) => {
    req.session.destroy(() => {
        console.log('== Logged out');
        res.redirect('/fresh');
    });
});


app.get('/pear/:pid', async (req, res) => {
    const PID = req.params.pid;
    const result = await getPearById(PID).catch((err) => console.log(err));
    res.send(`On user page ${PID}`);
    // res.render('pear', {pearInfo: result});
});

app.get('/user/:uid', async (req, res) => {
    const UID = req.params.uid;
    res.send(`On user page ${UID}`);
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
