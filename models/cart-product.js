const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const CartProduct = sequelize.define('cartProduct', {
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

module.exports = CartProduct;