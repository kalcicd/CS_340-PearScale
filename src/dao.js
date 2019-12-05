const {connectDb, close} = require('./connection');

const testAttributes = {
    UID: 3,
    Title: 'Test Title',
    Description: 'Test Description',
    Image: 'fake-url.com',
};

/**
 * @name getFreshPears
 * @param connection An open connection object
 * @returns {Promise<any>} returns a promise object that resolves with an array of newest pears
 */
const getFreshPears = async (connection) => {
    return await new Promise((resolve, reject) => {
        const sql = `SELECT * FROM newestPears`;
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                console.log('== Getting Top Pears');
                console.log(result);
                resolve(result);
            }
        })
    });
};

/**
 * @name getTopPears
 * @param connection An open connection object
 * @returns {Promise<any>} returns a promise object that resolves with an array of top rated pears
 */
const getTopPears = async (connection) => {
    return await new Promise((resolve, reject) => {
        const sql = `SELECT * FROM highestRatedPears`;
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                console.log('== Getting Fresh Pears');
                resolve(result);
            }
        });
    });
};

/**
 * @name createPear Inserts a pear into the DB
 * @param connection An open connection object
 * @param attributes An object
 * @returns {Promise<any>} returns a promise object that resolves with newly inserted row
 */
const createPear = async (connection, attributes) => {
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
                resolve(result[0]);
            }
        });
    });
};

// const asyncTest = async () => {
//     const conn = connectDb();
//     const newPear = await getFreshPears(conn);
//     console.log('newPear:', newPear);
//     close(conn);

// };
// asyncTest().then().catch((error) => {
//     console.log(error);
// });

module.exports = {
    createPear,
    getTopPears,
    getFreshPears,
};

