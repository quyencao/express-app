const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const OrderProduct = sequelize.define('orderProduct', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
});

module.exports = OrderProduct;