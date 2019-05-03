const fs = require('fs');
const path = require('path');

const rootDir = path.dirname(process.mainModule.filename);
const filePath = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {
    static addProduct(id, price) {
        fs.readFile(filePath, (err, content) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(content);
            }

            let existingProductIndex = cart.products.findIndex(p => p.id === id);
            let existingProduct = cart.products[existingProductIndex];
            let newProduct;

            if (existingProduct) {
                newProduct = { ...existingProduct };
                newProduct.quantity += 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = newProduct;
            } else {
                newProduct = { id, quantity: 1 };
                cart.products = [...cart.products, newProduct];
            }

            cart.totalPrice = cart.totalPrice + +price;

            fs.writeFile(filePath, JSON.stringify(cart), (err) => {
                console.log(err);
            });
        });
    }

    static deleteProduct(id, price) {
        fs.readFile(filePath, (err, content) => {
            if (err) {
                return;
            }

            const updatedCart = { ...JSON.parse(content) };
            const product = updatedCart.products.find(p => p.id === id);

            if (!product) {
                return;
            }

            updatedCart.products = updatedCart.products.filter(p => p.id !== id);
            updatedCart.totalPrice -= product.quantity * price;

            fs.writeFile(filePath, JSON.stringify(updatedCart), (err) => {
                console.log(err);
            });
        });
    }

    static getCart(callback) {
        fs.readFile(filePath, (err, content) => {
            if (err) {
                return callback(null);
            }
            callback(JSON.parse(content));
        });
    }
};