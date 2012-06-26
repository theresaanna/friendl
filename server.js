var express = require('express');
var app = express.createServer();
var everyauth = require('everyauth');
var util = require('util');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/friendl');
var users = require('./data/users.js');

everyauth.twitter
    .consumerKey('nope')
    .consumerSecret('nope')
    .findOrCreateUser(function(session, accessToken, accessTokenSecret, twitterUserMetadata) {
        var tid = twitterUserMetadata.id;
        var promise = this.Promise();

        // check to see if this user is already registered
        // if they are, we receive a promise fulfillment from this call
        var user = users.findUserByTwitterId(tid, promise);

        // if we don't receive a user object back, meaning that they're not registered,
        // create a new user and fulfill the promise with this object
        if (typeof user === 'undefined') {
            promise.fulfill(users.createUser({
                    name: twitterUserMetadata.name,
                    twitterId: tid,
                    image: twitterUserMetadata.profile_image_url
                })
            );
        }

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
