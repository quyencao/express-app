const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
   res.render('admin/edit-product', { title: 'Add Product', path: '/admin/add-product', edit: false });
};

exports.postAddProduct = (req, res, next) => {
   const { title, imageUrl, price, description } = req.body;
   const product = new Product(null, title, imageUrl, price, description);
   product.save()
      .then(() => {
         res.redirect('/');
      })
      .catch(error => console.log(error));
};

exports.getEditProduct = (req, res, next) => {
   const productId = req.params.productId;
   Product.findById(productId)
         .then(([rows, fields]) => {
            res.render('admin/edit-product', { title: 'Edit Product', product: rows[0], path: '/admin/edit-product', edit: true });
         })
         .catch(error => console.log(error));
};

exports.postEditProduct = (req, res, next) => {
   const productId = req.body.productId;
   const updatedTitle = req.body.title;
   const updatedPrice = req.body.price;
   const updatedImageUrl = req.body.imageUrl;
   const updatedDescription = req.body.description;

   const updatedProduct = new Product(productId, updatedTitle, updatedImageUrl, updatedPrice, updatedDescription);

   updatedProduct.save()
      .then(() => {
         res.redirect('/admin/products');
      })
      .catch(error => console.log(error));

};

exports.postDeleteProduct = (req, res, next) => {
   const productId = req.body.productId;

   Product.deleteById(productId)
      .then(() => {
         res.redirect('/admin/products');
      })
      .catch(error => console.log(error));
};

exports.getProducts = (req, res, next) => {
   Product.fetchAll()
      .then(([rows, fields]) => {
         res.render('admin/products-list', { title: 'Admin Products', products: rows, path: '/admin/products' })
      })
      .catch(error => console.log(error));
};