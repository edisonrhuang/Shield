const mysql = require('mysql2/promise');

module.exports = mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME
});