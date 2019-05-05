const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'sql12.freesqldatabase.com',
    port: 3306,
    user: 'sql12290603',
    password: '8VZRdlBLHa',
    database: 'sql12290603',
});

module.exports = pool.promise();