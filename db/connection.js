const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '@Lemonade02',
        database: 'company'
    },

    console.log('Connected to the company database bitch!')
);



module.exports = db;