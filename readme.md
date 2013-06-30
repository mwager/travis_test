This repo is only for testing travis ci integration.

[![Build Status](https://travis-ci.org/mwager/travis_test.png?branch=master)](https://travis-ci.org/mwager/travis_test)

Running the tests locally:

    $ npm install
    # start mongodb if not already running
    $ mongod &
    $ npm test

CasperJS:

See [this tutorial from Ariya Hidayat](http://ariya.ofilabs.com/2012/03/phantomjs-and-travis-ci.html) about phantomjs integration

    $ node server.js &
    $ casperjs/bin/casperjs test test_casper.js

Testem:

    $ node_modules/testem/testem.js    # dev mode
    $ node_modules/testem/testem.js ci # ci  mode

Conclusion

The setup for this repo including full travis integration took me about two hours and everything just worked.

Thank you TravisCI!
