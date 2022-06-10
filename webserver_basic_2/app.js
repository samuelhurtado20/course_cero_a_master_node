const express = require('express');
require('dotenv').config()
const app = express();

const hbs = require('hbs');
require('./hbs/helpers');

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

// Express HBS engine
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index', {
        nombre: 'app name'
    });
});

app.get('/elements', (req, res) => {
    res.render('elements');
});

app.get('/generic', (req, res) => {
    res.render('generic');
});

app.get('*', (req, res) => {
    res.render('index', {
        nombre: 'app name'
    });
});

app.listen(port, () => {
    console.log(`LISTEN ON PORT ${ port }`);
});