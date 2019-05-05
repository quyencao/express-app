const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
    Product.findAll()
        .then((products) => {
            console.log(products);
            res.render('shop/index', { title: 'Shop', products, path: '/' });
        })
        .catch(error => console.log(error));
};

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then((products) => {
            res.render('shop/products-list', { title: 'All Products', products, path: '/products' });
        })
        .catch(error => console.log(error));
};

exports.getProductDetails = (req, res, next) => {
    const productId = req.params.productId;
    Product.findOne({
       where: { id: productId }
    })
    .then((product) => {
        res.render('shop/product-details', { title: product.title, path: '/products', product })
    })
    .catch(error => console.log(error));
};

exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts();
        })
        .then(products => {
            const totalPrice = products.reduce((acc, current) => acc + +current.price * current.cartProduct.quantity, 0);
            res.render('shop/cart', { title: 'Your Cart', path: '/cart', products, totalPrice });
        })
        .catch(error => console.log(error));
};

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    let fetchedCart;

    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({ where: { id: productId } });
        })
        .then(products => {
            let product;
            if (products.length > 0) {
                product = products[0];
                // access join table field product.[joinTableModelName].quantity
                return [product, product.cartProduct.quantity + 1];
            } else {
               return Promise.all([Product.findByPk(productId), 1])
            }
        })
        .then(([product, quantity]) => {
            return fetchedCart.addProduct(product, { through: { quantity } });
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(error => console.log(error));
};

exports.postCartDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;

    req.user
       .getCart()
       .then(cart => {
            return cart.getProducts({ where: { id: productId } });
       })
       .then(products => {
           const product = products[0];
           return product.cartProduct.destroy();
       })
       .then(() => {
           res.redirect('/cart');
       })
       .catch(error => console.log(error));
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', { title: 'Checkout', path: '/checkout' });
};

exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then(products => {
            return Promise.all([req.user.createOrder(), products]);
        })
        .then(([order, products]) => {
            return order.setProducts(products.map(product => {
                product.orderProduct = {
                    quantity: product.cartProduct.quantity
                };
                return product;
            }))
        })
        .then(() => {
            // Reset cart
            return fetchedCart.setProducts([]);
        })
        .then(() => {
            res.redirect('/orders');
        })
        .catch(error => console.log(error));
};

exports.getOrders = (req, res, next) => {
    req.user
        .getOrders({
            include: [{
                model: Product
            }]
        })
        .then(orders => {
            res.render('shop/orders', { title: 'Orders', path: '/orders', orders });
        })
        .catch(error => console.log(error));
};