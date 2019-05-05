const db = require('../utils/database');

module.exports = class Cart {
    static addProduct(id, price) {
        return db.execute('SELECT * FROM carts WHERE product_id = ?', [id])
            .then(([rows, fields]) => {
                if (rows.length > 0) {
                   return db.execute('UPDATE carts SET quantity = quantity + 1 WHERE product_id = ?', [id]);
                } else {
                   return db.execute('INSERT INTO carts (product_id, quantity) VALUES(?, ?)', [id, 1]);
                }
            })
            .catch(error => console.log(error));
    }

    static deleteProduct(id, price) {
        return db.execute('DELETE FROM carts WHERE product_id = ?', [id]);
    }

    static getCart() {
        return db.execute('SELECT * FROM carts INNER JOIN products ON carts.product_id = products.id');
    }
};