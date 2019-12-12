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
    ratePear,
    reportPear,
    getUserByUsername,
    getUserByUID,
    createAccount,
    getPearsByUID,
    getRatingInfo,
    deletePear,
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
    const user = await getUserByUsername(name).catch((err) => console.log(err));
    if (!user) {
        reject('User does not exist');
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
    const sessionUser = req.session.user;
    console.log(sessionUser);
    if (search) {
        console.log(`== Searching ${search} pears`);
        const results = await searchPears(search).catch((err) => console.log(err));
        res.render('home', {pears: results, sessionUser: sessionUser});
    } else {
        console.log('== Got request for the home page');
        const freshPears = await getFreshPears().catch((err) => console.log(err));
        res.render('home', {pears: freshPears, sessionUser: sessionUser});
    }
});

app.get('/fresh', async (req, res) => {
    console.log('== Got request for the fresh page');
    const freshPears = await getFreshPears().catch((err) => {
        console.log(err);
        res.status(500).end();
    });

    const sessionUser = req.session.user;

    res.render('home', {pears: freshPears, sessionUser: sessionUser});

});

app.get('/ripe', async (req, res) => {
    console.log('== Got request for ripe pears');
    const ripePears = await getRipePears().catch((err) => {
        console.log(err);
        res.status(500).end();
    });
    const sessionUser = req.session.user;
    res.status(200).render('home', {pears: ripePears, sessionUser: sessionUser});
});

app.post('/createPear', async (req, res) => {
    if (req.session.user) {
        const body = req.body;
        body.UID = req.session.user.UID;
        console.log('== Posting pear');
        const {PID} = await createPear(body).catch((err) => {
            console.log(err);
            res.status(500).send(err);
        });
        res.status(201).redirect(`/pears/${PID}`);
    } else {
        console.log('user is undefined:');
        res.status(401).send();
    }
});

app.post('/deletePear', async (req, res) => {
    const user = req.session.user;
    if (user) {
        const body = req.body;
        const {UID} = await getPearById(body.PID).catch((err) => {
            console.log(err);
            res.status(500).send(err);
        });
        if (user.UID === UID) {
            const result = await deletePear(body.PID).catch((err) => {
                console.log(err);
                res.status(500).send(err);
            });
            res.status(200).send(result);
        } else {
            console.log('unauthorized');
            res.status(401).send();
        }
    } else {
        console.log('no user logged in:');
        res.status(401).send();
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
        const result = await createAccount(newAccount).catch((err) => {
            if (err.errno === 1062) {
                console.log('Username is already taken');
                res.status(409).send();
            } else res.status(500).send();
        });
        if (result) {
            res.status(201).send(result);
        }
        res.redirect('/');
    });
});


app.post('/ratePear', async (req, res) => {
    if (!req.session.user) {
        res.status(401).send('Not logged in');
    } else {
        const {UID} = req.session.user;
        const {PID, rating} = req.body;
        const result = await ratePear(UID, PID, rating).catch((err) => {
            console.log(err);
            res.status(500).send(err);
        });
        res.status(201).send(result);
    }
});

app.post('/reportPear', async (req, res) => {
    const {PID, description} = req.body;
    const result = await reportPear(PID, description);
    res.status(201).send(result);
});

app.post('/login', async (req, res) => {
    const user = await authenticate(req.body.username, req.body.password).catch((err) => {
        req.session.error = err;
        console.log(err);
        res.status(500).send(err);
    });
    if (!user) {
        req.session.error = 'Authentication failed, please check your username and password.';
        console.log(req.session.error);
        res.status(401).send(req.session.error);
    } else {
        req.session.regenerate(() => {
            req.session.user = user;
            req.session.success = `== Authenticated as ${req.session.user.Username}`;
            console.log(req.session.success);
            req.session.save(() => {
                res.status(200).redirect(`/user/${req.session.user.Username}`);
            });
        });
    }
});

app.post('/logout', async (req, res) => {
    req.session.destroy(() => {
        console.log('== Logged out');
        res.redirect('/');
    });
});


app.get('/pears/:pid(\\d+)', async (req, res) => {
    const PID = req.params.pid;
    const pear = await getPearById(PID).catch((err) => console.log(err));
    if (!pear) {
        res.status(404).redirect('/404');
    } else {
        const {Username} = await getUserByUID(pear.UID); // probably could have designed our tables better lol
        pear.Username = Username;
        const sessionUser = req.session.user;
        let isOwnedPear = false;
        const ratingInfo = await getRatingInfo(pear.PID);
        if (!sessionUser) {
            isOwnedPear = false;
        } else if (sessionUser.UID === pear.UID) {
            isOwnedPear = true;
        }
        // avg rating: ratings.average  num ratings: ratings.numRatings
        res.status(200).render('pears', {pearInfo: pear, ratings: ratingInfo, ownedPear: isOwnedPear, sessionUser: sessionUser});
    }
});

app.get('/users/:username', async (req, res) => {
    const username = req.params.username;
    const user = await getUserByUsername(username).catch((err) => console.log(err));
    if (!user) {
        res.status(404).redirect('/404');
    } else {
        const sessionUser = req.session.user;
        const userPears = await getPearsByUID(user.UID).catch((err) => console.log(err));
        let isSelfPage = false;
        if (!sessionUser) {
            isSelfPage = false;
        } else if (sessionUser.Username === user.Username){
            isSelfPage = true;
        }
        res.status(200).render('users', {pears: userPears, userInfo: user, selfPage: isSelfPage, sessionUser: sessionUser});
    }


    // const pears = await getPearByUID(UID).catch((err) => console.log(err));
    // res.render('user', {userInfo: result, userPears: pears});
});

app.get('*', (req, res) => {
    res.send('YOU GOT LOST LOL');
});

const port = process.env.PORT || 6969;


app.listen(port, () => {
    console.log('== Server is listening on port', port);
});
