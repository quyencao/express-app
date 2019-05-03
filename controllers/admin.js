const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
   res.render('admin/edit-product', { title: 'Add Product', path: '/admin/add-product', edit: false });
};

exports.postAddProduct = (req, res, next) => {
   const { title, imageUrl, price, description } = req.body;
   const product = new Product(null, title, imageUrl, price, description);
   product.save();
   res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
   const productId = req.params.productId;
   Product.findById(
      productId,
      (product) => {
         res.render('admin/edit-product', { title: 'Edit Product', product, path: '/admin/edit-product', edit: true });
      }
   );
};

exports.postEditProduct = (req, res, next) => {
   const productId = req.body.productId;
   const updatedTitle = req.body.title;
   const updatedPrice = req.body.price;
   const updatedImageUrl = req.body.imageUrl;
   const updatedDescription = req.body.description;

   const updatedProduct = new Product(productId, updatedTitle, updatedImageUrl, updatedPrice, updatedDescription);

   updatedProduct.save();

   res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res, next) => {
   const productId = req.body.productId;

   Product.deleteById(productId);

   res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(
       (products) => { res.render('admin/products-list', { title: 'Admin Products', products, path: '/admin/products' }) }
    );
};