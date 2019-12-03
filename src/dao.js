const mysql = require('mysql');
const config = require('./config');

const connectDb = () => {
    const connection = mysql.createConnection(config);
    connection.connect();
    return connection;
};

const testAttributes = {
    UID: 3,
    Title: 'Test Title',
    Description: 'Test Description',
    Image: 'fake-url.com',
};

/**
 * @name createPear Inserts a pear into the DB
 * @param attributes An object
 * @returns {Promise<any>} returns a promise object that resolves with newly inserted row
 */
const createPear = async (attributes) => {
    const connection = await connectDb();
    console.log(connection);
    const {insertId} = await new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Pears (UID, Title, Description, Image, Date, Time) ' +
            'VALUES (?, CURRENT_DATE(), CURRENT_TIME())';
        connection.query(sql, [Object.values(attributes)], (err, result) => {
            if (err) {
                reject(err);
            } else {
                console.log(`== row inserted with UID = ${result.insertId}`);
                resolve(result);
            }
        });
    });
    return await new Promise((resolve, reject) => {
        connection.query('SELECT * FROM Pears WHERE PID = ?', [insertId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                connection.end();
                // console.log('result', result[0]);
                resolve(result[0]);
            }
        });
    });
};

const asyncTest = async () => {
    const newPear = await createPear(testAttributes);
    console.log('newPear:', newPear);
};
asyncTest().then().catch((error) => {
    console.log(error);
});
