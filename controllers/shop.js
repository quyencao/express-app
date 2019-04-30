const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
    Product.fetchAll(
        (products) => { res.render('shop/index', { title: 'Shop', products, path: '/' }); }
    );
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(
        (products) => { res.render('shop/products-list', { title: 'All Products', products, path: '/products' }); }
    );
};

exports.getCart = (req, res, next) => {
    res.render('shop/cart', { title: 'Your Cart', path: '/cart' });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', { title: 'Checkout', path: '/checkout' });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', { title: 'Orders', path: '/orders' });
};