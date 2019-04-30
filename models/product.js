const fs = require('fs');
const path = require('path');

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
    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        getProductsFromFile((products) => {
            products.push(this);

            fs.writeFile(filePath, JSON.stringify(products), (err) => {
                console.log(err);
            });
        })
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }
};