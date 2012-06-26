var express = require('express');
var app = express.createServer();
var everyauth = require('everyauth');
var util = require('util');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/friendl');
var users = require('./data/users.js');

var thing = users.Users;
console.log(thing);

everyauth.twitter
    .consumerKey('nope')
    .consumerSecret('nope')
    .findOrCreateUser(function(session, accessToken, accessTokenSecret, twitterUserMetadata) {
        console.log(twitterUserMetadata);
        var promise = this.Promise();
        users.findUserByTwitterId('2');
        return promise;
    }).redirectPath('/');

app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({secret: 'nope'}));
    app.use(everyauth.middleware());
    app.use(app.router);
    app.use(express.errorHandler());
    app.use(express.static(__dirname + "/public"));
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    everyauth.helpExpress(app);
});

app.get('/', function(req, res) {
    res.render('home');
});

app.listen(3000);
