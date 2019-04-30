const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
   res.render('admin/add-product', { title: 'Add Product', path: '/admin/add-product' });
};

exports.postAddProduct = (req, res, next) => {
   const { title, imageUrl, price, description } = req.body;
   const product = new Product(title, imageUrl, price, description);
   product.save();
   res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
   res.render('admin/edit-product', { title: 'Edit Product', path: '/admin/edit-product' });
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(
       (products) => { res.render('admin/products-list', { title: 'Admin Products', products, path: '/admin/products' }) }
    );
};