all_tests:
	npm test && ./casperjs/bin/casperjs test test_casper.js && node_modules/testem/testem.js launchers && node_modules/testem/testem.js ci