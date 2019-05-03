const fs = require('fs');
const path = require('path');

const uuid = require('uuid/v1');

const Cart = require('./cart');

const rootDir = path.dirname(process.mainModule.filename);
const filePath = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = (callback) => {
    fs.readFile(filePath, (err, content) => {
        if (err) {
            return callback([]);
        }

        callback(JSON.parse(content));
    });
};

module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        getProductsFromFile((products) => {
            if (this.id) {
                const existingProductIndex = products.findIndex(p => p.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                });
            } else {
                this.id = uuid();
                products.push(this);

                fs.writeFile(filePath, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
        })
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }

    static findById(productId, callback) {
        getProductsFromFile((products) => {
            callback(products.find(p => p.id === productId));
        });
    }

    static deleteById(productId) {
        getProductsFromFile((products) => {
            const product = products.find(p => p.id === productId);
            const updatedProducts = products.filter(p => p.id !== productId);

            fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) => {
                Cart.deleteProduct(productId, product.price);
            });
        });
    }
};