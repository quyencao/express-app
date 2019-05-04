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
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            let cartProducts = [];
            for(let product of products) {
                let cartProductData = cart.products.find(p => p.id === product.id);
                if (cartProductData) {
                    cartProducts.push({ data: product, quantity: cartProductData.quantity });
                }
            }

            let updatedCart = { ...cart };
            updatedCart.products = cartProducts;
            res.render('shop/cart', { title: 'Your Cart', path: '/cart', products: cartProducts });
        });
    });
};

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(
        productId,
        (product) => {
            Cart.addProduct(productId, product.price);
            res.redirect('/cart');
        }
    );
};

exports.postCartDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(
        productId,
        (product) => {
            Cart.deleteProduct(productId, product.price);
            res.redirect('/cart');
        }
    );
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', { title: 'Checkout', path: '/checkout' });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', { title: 'Orders', path: '/orders' });
};