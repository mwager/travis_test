/*global require:true, console:true, describe:true, before:true, it:true, process:true*/

// straight forward testsuite to play with node.js testing
// using mocha and mongodb/mongoose at travis

var
    ENV      = process.env.NODE_ENV || 'development',
    mongoose = require('mongoose'),
    should   = require('should'),
    log,
    User;

log = console.log;

log('>>> NODE ENVIRONMENT IS: ' + ENV);

/**
 * Quick & dirty database setup on travis (binds to localhost)
 *
 * @see http://about.travis-ci.org/docs/user/database-setup/
 */
function connectDB(mongoose, cb) {
        var dbPath, connection;

        var HOST = '127.0.0.1',
            PORT = '27017',
            USER = '',
            PASS = '',
            DATABASE = 'travis_test';

        dbPath = 'mongodb://' + (USER) + ':';
        dbPath += (PASS) + '@';
        dbPath += (HOST) + ':';
        dbPath += (PORT) + '/';
        dbPath += DATABASE;

        log('connecting to db: ' + dbPath);

        connection = mongoose.connect(dbPath, cb);

        mongoose.connection.on('error', function (err) {
            log('>>> DB ERROR: ' + err);
        });

        return connection;
}

describe('TestSuite', function() {
    before(function(done) {
        var connection = connectDB(mongoose);

        // register the user model
        require('./user_model')(connection);

        // init our mongoose user model
        User = mongoose.model('User');

        // first clear the collection
        var q = User.find();
        q.remove(function (err) {
            if (err) {
                return log(err);
            }

            // then create some demo data
            var u = new User({name: 'hans'});
            u.save(done);
        });
    });

    it('should find users by name', function(done) {
        User.findByName('hans', function(err, user) {
            should.not.exist(err);
            should.exist(user);
            should.exist(user._id);
            user.name.should.equal('hans');
            log('>>> User: ', user);
            done();
        });
    });
});
