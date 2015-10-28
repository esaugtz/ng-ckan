'use strict';

exports.config  = {
    allScriptsTimeout   : 100000,
    baseUrl             : 'http://localhost:9001/',
    capabilities        : {
        'browserName'   : 'firefox'
    },
    framework           : 'jasmine',
    jasmineNodeOpts     : {
        defaultTimeoutInterval  : 100000
    },
    seleniumAddress     : 'http://localhost:4444/wd/hub',
    specs               : [
        'test/e2e/*.js'
    ]
};