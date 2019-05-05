const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
   res.render('admin/edit-product', { title: 'Add Product', path: '/admin/add-product', edit: false });
};

exports.postAddProduct = (req, res, next) => {
   const { title, imageUrl, price, description } = req.body;

   req.user
      .createProduct({
         title,
         price,
         description,
         imageUrl
      })
      .then(product => {
         res.redirect('/');
      })
      .catch(error => console.log(error));

   // Product.create({ title, imageUrl, price, description })
   //    .then(product => {
   //       return product.setUser(req.user);
   //    })
   //    .then(() => {
   //       res.redirect('/');
   //    })
   //    .catch(error => console.log(error));
};

exports.getEditProduct = (req, res, next) => {
   const productId = req.params.productId;
   req.user
      .getProducts({
         where: { id: productId }
      })
      .then(products => {
         res.render('admin/edit-product', { title: 'Edit Product', product: products[0], path: '/admin/edit-product', edit: true });
      })
      .catch(error => console.log(error));

   // Same as
   // Product
   //    .findOne({
   //       where: { id: productId, userId: req.user.id }
   //    })
   //    .then(product => {
   //       res.render('admin/edit-product', { title: 'Edit Product', product, path: '/admin/edit-product', edit: true });
   //    })
   //    .catch(error => console.log(error));
};

exports.postEditProduct = (req, res, next) => {
   const productId = req.body.productId;
   const updatedTitle = req.body.title;
   const updatedPrice = req.body.price;
   const updatedImageUrl = req.body.imageUrl;
   const updatedDescription = req.body.description;

   Product.findByPk(productId)
      .then(product => {
         product.title = updatedTitle;
         product.price = updatedPrice;
         product.imageUrl = updatedImageUrl;
         product.description = updatedDescription;

         return product.save();
      })
      .then(() => {
         res.redirect('/admin/products');
      })
      .catch(error => console.log(error));

   // Product.update({ title: updatedTitle, price: updatedPrice, imageUrl: updatedImageUrl, description: updatedDescription },
   //    { where: { id: productId } })
   //    .then(() => {
   //       res.redirect('/admin/products');
   //    })
   //    .catch(error => console.log(error));

};

exports.postDeleteProduct = (req, res, next) => {
   const productId = req.body.productId;

   Product.findByPk(productId)
      .then((product) => {
         return product.destroy();
      })
      .then(() => {
         res.redirect('/admin/products');
      })
      .catch(error => console.log(error));


   // Product.destroy({ where: { id: productId } })
   //       .then(() => {
   //          res.redirect('/admin/products');
   //       })
   //       .catch(error => console.log(error));
};

exports.getProducts = (req, res, next) => {
   req.user
      .getProducts()
      .then((products) => {
         res.render('admin/products-list', { title: 'Admin Products', products, path: '/admin/products' })
      })
      .catch(error => console.log(error));

   // Same as
   // Product
   //    .findAll({
   //       where: {
   //          userId: req.user.id
   //       }
   //    })
   //    .then((products) => {
   //       res.render('admin/products-list', { title: 'Admin Products', products, path: '/admin/products' })
   //    })
   //    .catch(error => console.log(error));
};