const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const { router: adminRoutes } = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

// const hbs = exphbs.create({
//     helpers: {
//         gt: function(a, b) {
//             return (a > b);
//         }
//     }
// });

// app.engine('hbs', hbs.engine);
app.engine('hbs', exphbs({ defaultLayout: 'main-layout', layoutsDir: path.join(__dirname, 'views', 'layouts'), extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
// app.set('views', [path.join(__dirname, 'views')]);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

app.listen(3000);