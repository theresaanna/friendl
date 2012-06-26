var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/friendl');

var Schema = mongoose.Schema;

var User = new Schema({
    name: {type: String},
    email: {type: String},
    twitter: {type: String}
});   

var Users = mongoose.model('User', User);

exports.User = User;
exports.Users = Users;

exports.findUserByTwitterId = function(tid) {
    Users.findOne({twitter: tid}, function(err, doc){
        if (err) {
            throw new Error(err);
        }
        else {
            return doc;
        }
    });
};
