// NPMs
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 3000;

const Article = require('./models/Article.js');

// App use
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(express.static('./public'));

mongoose.connect('mongodb://heroku_8pldnxjq:p6osc1v3to3i093kchl9cj4e63@ds125053.mlab.com:25053/heroku_8pldnxjq');

const db = mongoose.connection;

db.on('error', function (err) {
    console.log('Mongoose Error: ', err);
});

db.once('open', function () {
    console.log('Mongoose connection successful.');
});

// get, post, delete routes
app.get('/', function (req, res) {
    res.sendFile('./public/index.html');
})

app.get('/api/saved', function (req, res) {
    Article.find({})
        .exec(function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                res.send(doc);
            }
        })
});

app.post('/api/saved', function (req, res) {
    const newArticle = new Article({
        title: req.body.title,
        date: req.body.date,
        url: req.body.url
    });

    newArticle.save(function (err, doc) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json(doc);
        }
    });
});

app.delete('/api/saved/:id', function (req, res) {
    Article.find({'_id': req.params.id}).remove()
        .exec(function (err, doc) {
            res.send(doc);
        });
});

// app listening on port 3000
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});