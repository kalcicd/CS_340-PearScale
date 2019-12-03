const _ = require('lodash');
const {connectDb, close} = require('./connection');

const testPear = {
    UID: 3,
    title: 'Test Title',
    description: 'Test Description',
    image: 'fake-url.com',
};

const testUser = {
    username: 'Foo',
    password: 'wrongpassword',
    birthday: '2011-10-10',
    email: 'user@gmail.com',
};

/**
 * @name reportPear
 * @param connection An open connection object
 * @param PID The PID of the reported pear
 * @param description Description of the report
 * @returns {Promise<any>} resolves the created account
 */
const reportPear = async (connection, PID, description) => {
    return await new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Reports (PID, Description, Date) VALUES (?, CURRENT_DATE())';
        const bindVars = [[PID, description]];
        connection.query(sql, bindVars, (err, result) => {
            if (err) {
                reject(err);
            } else {
                console.log(`== report inserted with RPID = ${result.insertId}`);
                resolve(result);
            }
        });
    });
};

/**
 * @name createAccount
 * @param connection An open connection object
 * @param userInfo An object containing user data
 * @returns {Promise<any>} resolves the created account
 */
const createAccount = async (connection, userInfo) => { // lol plaintext passwords
    return await new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Users (Username, Password, Birthday, Email) VALUES (?)';
        const bindVars = [[userInfo.username, userInfo.password, userInfo.birthday, userInfo.email]];
        connection.query(sql, bindVars, (err, result) => {
            if (err) {
                reject(err);
            } else {
                console.log(`== row inserted with UID = ${result.insertId}`);
                resolve(result);
            }
        });
    });
};

/**
 * @name logIn
 * @param connection An open connection object
 * @param userInfo An object containing the user's login info
 * @returns {Promise<any>} resolves object of logged in user, undefined if incorrect login
 */
const logIn = async (connection, userInfo) => {
    return await new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Users WHERE (Username = ? AND Password = ?)';
        const sqlBinds = [userInfo.username, userInfo.password];
        connection.query(sql, sqlBinds, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result[0]);
            }
        });
    });
};

/**
 * @name ratePear
 * @param connection An open connection object
 * @param UID The UID of the user rating the pear
 * @param PID The PID of the pear to be rated
 * @param rating A numeric rating of the pear
 */
const ratePear = async (connection, UID, PID, rating) => {
    const rated = await new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Ratings WHERE (PID = ? AND UID = ?)';
        const sqlBinds = [PID, UID];
        connection.query(sql, sqlBinds, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
    const sqlBinds = [rating, PID, UID];
    console.log('rated:', rated);
    if (!_.isEmpty(rated)) {
        return await new Promise((resolve, reject) => {
            const sql = 'UPDATE Ratings SET Score = ? WHERE (PID = ? AND UID = ?)';
            connection.query(sql, sqlBinds, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('== Rating updated');
                    resolve(result);
                }
            });
        });
    } else {
        return await new Promise((resolve, reject) => {
            const sql = `INSERT INTO Ratings (Score, PID, UID) VALUES (?)`;
            const sqlBinds = [rating, PID, UID];
            connection.query(sql, [sqlBinds], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('== New rating added');
                    resolve(result);
                }
            });
        });
    }
};

/**
 * @name getAverageRating
 * @param connection An open connection object
 * @param PID The PID of the pear
 * @returns {Promise<any>} resolves the average rating of pear
 */
const getAverageRating = async (connection, PID) => {
    return await new Promise((resolve, reject) => {
        const sql = 'SELECT AVG(Score) AS average FROM Ratings WHERE PID = ?';
        connection.query(sql, [PID], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result[0].average);
            }
        })
    });
};

/**
 * @name searchPears
 * @param connection An open connection object
 * @param search A search query
 * @returns {Promise<any>} returns a promise object that resolves with an array of newest pears
 */
const searchPears = async (connection, search) => {
    return await new Promise((resolve, reject) => {
        const sanitized = search.toLowerCase();
        const sql = `SELECT PID, UID, Title, Description, Image, Date, Time
        FROM (SELECT * FROM pearTags WHERE Tag LIKE '%${sanitized}%') as swag`;
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                console.log(`== Getting Pears with tags containing '${sanitized}'`);
                resolve(result);
            }
        });
    });
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
                console.log('== Getting Fresh Pears');
                resolve(result);
            }
        })
    });
};

/**
 * @name getRipePears
 * @param connection An open connection object
 * @returns {Promise<any>} returns a promise object that resolves with an array of top rated pears
 */
const getRipePears = async (connection) => {
    return await new Promise((resolve, reject) => {
        const sql = `SELECT * FROM highestRatedPears`;
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                console.log('== Getting Top Pears');
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
        const bindVars = [[attributes.UID, attributes.title, attributes.description, attributes.image]];
        connection.query(sql, bindVars, (err, result) => {
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

const conn = connectDb();
const asyncTest = async () => {
    const result = await reportPear(conn, 8, 'Delete this');
    console.log('result:', result);
    close(conn);

};
asyncTest().catch((error) => {
    close(conn);
    console.log(error);
});

module.exports = {
    createPear,
    getRipePears,
    getFreshPears,
    searchPears,
    createAccount,
    logIn,
    ratePear,
    getAverageRating,
    reportPear,
};

