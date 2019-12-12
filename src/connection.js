const {createConnection} = require('mysql');

const config = require('./config');

const connectDb = () => {
    // console.log('== Connecting to the database');
    const connection = createConnection(config);
    connection.connect();
    //  console.log('== Database connected');
    return connection;

};

const close = (connection) => {
    if (connection) {
        connection.end();
        // console.log('== Database connection closed');
    }
};

module.exports = {connectDb, close};