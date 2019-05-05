const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fields]) => {
            res.render('shop/index', { title: 'Shop', products: rows, path: '/' })
        })
        .catch(error => console.log(err));
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fields]) => {
            res.render('shop/products-list', { title: 'All Products', products: rows, path: '/products' });
        })
        .catch(error => console.log(error));
};

exports.getProductDetails = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId)
        .then(([rows, fields]) => {
            res.render('shop/product-details', { title: rows[0].title, path: '/products', product: rows[0] })
        })
        .catch(error => console.log(error));
};

exports.getCart = (req, res, next) => {
    Cart.getCart()
        .then(([rows, fields]) => {
            const totalPrice = rows.reduce((acc, current) => acc + +current.price * current.quantity, 0);
            res.render('shop/cart', { title: 'Your Cart', path: '/cart', products: rows, totalPrice });
        });
};

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;

    Cart.addProduct(productId)
        .then(() => {
            res.redirect('/cart');
        })
        .catch(error => console.log(error));
};

exports.postCartDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;

    Cart.deleteProduct(productId)
        .then(() => {
            res.redirect('/cart');
        })
        .catch(error => console.log(error));
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', { title: 'Checkout', path: '/checkout' });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', { title: 'Orders', path: '/orders' });
};