/*global module:true*/

/**
 * UserModel
 */
var Schema, mongoose;

module.exports = function UserModel(mongooseInstance) {
    mongoose = mongooseInstance;

    Schema = new mongoose.Schema({
        name: {
            type:  String,
            index: true
        }
    });

    Schema.statics.findByName = function(name, done) {
        this.find({name:name}, function(err, users) {
            if(err || !users) {
                return done(err || 'no user found with name: ' + name);
            }
            else if(users && users.length > 0) {
                return done(null, users[0]);
            }
            else {
                return done('no users found');
            }
        });
    };

    return mongoose.model('User', Schema);
};
