const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./utils/database');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorsController = require('./controllers/errors');

const User = require('./models/user');
const Product = require('./models/product');
const Cart = require('./models/cart');
const CartProduct = require('./models/cart-product');
const Order = require('./models/order');
const OrderProduct = require('./models/order-product');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
    User.findByPk(1)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch(error => console.log(error));
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorsController.get404);

Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
});
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Product.belongsToMany(Cart, { through: CartProduct });
Cart.belongsToMany(Product, { through: CartProduct });

User.hasMany(Order);
Order.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });

Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });

sequelize
    // .sync({ force: true })
    .sync()
    .then(() => {
        return User.findOrCreate({
            where: {
                id: 1,
                name: 'quyencm',
                email: 'quyen.cm@gmail.com',
                password: '123456'
            }
        });
    })
    .then(([user, created]) => {
        return user.createCart();
    })
    .then(() => {
        app.listen(3000);
    })
    .catch(error => console.log(error));