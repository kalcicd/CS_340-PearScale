const {createConnection} = require('mysql');

const config = require('./config');

const connectDb = () => {
    console.log('== Connecting to the database');
    const connection = createConnection(config);
    connection.connect();
    console.log('== Database connected');
    return connection;

};

const middlewareConnect = (req, res, next) => {
    console.log('== Connecting to the database');
    const connection = createConnection(config);
    connection.connect();
    req.db = connection;
    console.log('== Database connected');
    next();
};

const close = (db) => {
    if (db) {
        db.end();
        console.log('== Database connection closed');
    }
};

module.exports = {
    middlewareConnect,
    connectDb,
    close,
};