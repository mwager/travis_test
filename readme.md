This repo is only for testing travis ci integration.

![travis build](https://api.travis-ci.org/mwager/travis_test.png)

Running the tests locally:

    $ npm install
    # start mongodb if not already running
    $ mongod &
    $ npm test

CasperJS:

See [this tutorial from Ariya Hidayat](http://ariya.ofilabs.com/2012/03/phantomjs-and-travis-ci.html) about phantomjs integration

    $ node server.js &
    $ casperjs test casper_tests.js

