// the url of the node server to test via casperjs
var URL = 'http://127.0.0.1:3000';

// Global casper config
(function __configureCasperJS() {
    var t = 15000;
    casper.defaultWaitTimeout = t;  // override casper default timeout
    casper.options.verbose = true;  // little bit more info
    casper.options.waitTimeout = t; // default 5000
    casper.options.timeout = t;

    // global jQuery
    // casper.options.clientScripts = ['../lib/jquery.js'];

    casper.options.pageSettings = {
        onError: function (msg, trace) {
            console.log(msg, trace);
        }
    };

    var timeoutCount = 0;
    casper.options.onTimeout = function (timeoutInMillis) {
        casper.test.error('=> DAMNIT TIMEOUT! after: ' + timeoutInMillis);
        casper.test.fail('timeout somewhere...');
    };
    casper.options.onDie = function () {
        casper.test.error('=> DIE');
    };
    casper.options.onError = function (self, m) {
        casper.test.error('=> ERROR: ' + m);
        // capser.exit();
    };

    casper.on('remote.message', function (msg) {
        console.log(msg);
    });
}());

// test StartScreen and force clean state (logged out, db clean etc)
casper.start(URL, function () {
    // casper.capture('test.png');

    this.test.assertTextExists('Hello World', 'page body contains "Hello World"');
});

// run all tests
casper.run(function () {
    console.log('--- ALL TESTS DONE ---');

    casper.test.done();
});