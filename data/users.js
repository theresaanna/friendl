var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/friendl');

var Schema = mongoose.Schema;

var User = new Schema({
    name: {type: String},
    email: {type: String},
    twitterId: {type: String},
    image: {type: String}
});   

/**
  * instantiate new user instances with
  * requireVar.Users
  **/
var Users = mongoose.model('User', User);

exports.User = User;
exports.Users = Users;

/**
  * @param tid The user's Twitter user ID
  * @param promise A promise object via Everyauth
  * @returns A fulfilled promise object, if exists
  **/
exports.findUserByTwitterId = function(tid, promise) {
    Users.findOne({twitterId: tid}, function(err, doc){
        if (err) {
            throw new Error(err);
        }
        else {
            promise.fulfill(doc);
        }
    });
};

/**
  * @param userObj an object that contains data for a new user matching the schema outlined in User
  **/
exports.createUser = function(userObj) {
    var user = new Users;
    user.name = userObj.name;
    user.twitterId = userObj.twitterId;
    user.image = userObj.image;
    user.save();
    return user;
}
