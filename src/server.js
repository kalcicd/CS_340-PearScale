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
    createAccount,
    getPearsByUID,
    getAverageRating,
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


app.post('/ratePear', async (req, res) => {
    if (!req.session.user) {
        console.log('Not logged in');
        res.end();
    } else {
        const {UID} = req.session.user;
        const {PID, rating} = req.body;
        const result = await ratePear(UID, PID, rating);
        res.send(result);
    }
});

app.post('/reportPear', async (req, res) => {
    const {PID, description} = req.body;
    const result = await reportPear(PID, description);
    console.log(result);
    res.end();
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
            req.session.save(() => {
                res.redirect(`/user/${req.session.user.Username}`);
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
        const sessionUser = req.session.user;
        let isOwnedPear = false;
        const avgRating = await getAverageRating(pear.PID);
        if (!sessionUser) {
            isOwnedPear = false;
        } else if (sessionUser.UID === pear.UID) {
            isOwnedPear = true;
        }
        res.status(200).render('pears', {pearInfo: pear, averageRating: avgRating, ownedPear: isOwnedPear});
    }
});

app.get('/users/:username', async (req, res) => {
    const username = req.params.username;
    const user = await getUserByUsername(username).catch((err) => console.log(err));
    if (!user) {
        res.status(404).redirect('/404');
    } else {
        const sessionUser = req.session.user;
        const userPears = await getPearsByUID(sessionUser.UID).catch((err) => console.log(err));
        let isSelfPage = false;
        if (!sessionUser) {
            isSelfPage = false;
        } else if (sessionUser.Username === user.Username){
            isSelfPage = true;
        }
        res.status(200).render('users', {pears: userPears, userInfo: user, selfPage: isSelfPage});
    }


    // const pears = await getPearByUID(UID).catch((err) => console.log(err));
    // res.render('user', {userInfo: result, userPears: pears});
});

app.get('*', (req, res) => {
    res.send('YOU GOT LOST LOL');
});

const port = process.env.PORT || 6968;


app.listen(port, () => {
    console.log('== Server is listening on port', port);
});
