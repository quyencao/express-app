const Sequelize = require('sequelize');

const sequelize = new Sequelize('sql12290603', 'sql12290603', '8VZRdlBLHa', {
    dialect: 'mysql',
    host: 'sql12.freesqldatabase.com',
    port: 3306
});

module.exports = sequelize;