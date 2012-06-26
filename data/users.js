var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/friendl');

var Schema = mongoose.Schema;

User = exports.User = new Schema({
    name: {type: String},
    email: {type: String},
    twitter: {type: String}
});   

Users = exports.Users = mongoose.model('User', User);

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
