const express = require('express');
const morgan = require('morgan');
const exhbs = require('express-handlebars');
const path = require('path');
const app = express();


//settings
app.set('port', process.env.PORT || 5000);
console.log('Sserver on port', app.get('port'))
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exhbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }))

//Routes
app.use(require('./routes/index'))

//Static
app.use(express.static(path.join(__dirname, 'public')));

//404 handler
app.use((req, res, next) => {
    res.status(404).send('404 Not found')
})


module.exports = app;