const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorsController = require('./controllers/errors');
const db = require('./utils/database');

const app = express();

db.execute('SELECT * FROM products WHERE id = 1')
    .then(([rows, fields]) => {
        console.log(rows);
    })
    .catch(err => console.log(err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorsController.get404);

app.listen(3000);