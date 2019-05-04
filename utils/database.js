const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'db4free.net',
    port: 3306,
    user: 'quyencm',
    password: 'j76EzLA6NmRcBee',
    database: 'nodecomplete',
});

module.exports = pool.promise();