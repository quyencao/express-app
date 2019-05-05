const db = require('../utils/database');

const Cart = require('./cart');

module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        if (this.id) {
            return db.execute('UPDATE products SET title = ?, price = ?, description = ?, imageUrl = ? WHERE id = ?',
                [this.title, this.price, this.description, this.imageUrl, this.id]);
        } else {
            return db.execute('INSERT INTO products (title, price, description, imageUrl) VALUES(?, ?, ?, ?)',
                [this.title, this.price, this.description, this.imageUrl]);
        }
    }

    static fetchAll() {
        return db.execute('SELECT * FROM products');
    }

    static findById(productId) {
        return db.execute('SELECT * FROM products WHERE id = ?', [productId]);
    }

    static deleteById(productId) {
        return db.execute('DELETE FROM products WHERE id = ?', [productId]);
    }
};