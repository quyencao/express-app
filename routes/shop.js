const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');

const router = express.Router();

const { products } = require('./admin');

router.get('/', (req, res, next) => {
    res.render('shop', { title: 'Shop', products, path: '/' });
});

module.exports = router;