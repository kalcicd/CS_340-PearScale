const testAttributes = {
    UID: 3,
    Title: 'Test Title',
    Description: 'Test Description',
    Image: 'fake-url.com',
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

const asyncTest = async () => {
    const newPear = await createPear(testAttributes);
    console.log('newPear:', newPear);
};
asyncTest().then().catch((error) => {
    console.log(error);
});

module.exports = {
    createPear,
};
