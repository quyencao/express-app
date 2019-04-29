const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');

const router = express.Router();

const { products } = require('./admin');

router.get('/', (req, res, next) => {
    res.render('shop', { title: 'Shop', products, path: '/', hasProducts: products.length > 0, activeShop: true, productCSS: true });
});

module.exports = router;