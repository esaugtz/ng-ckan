# FONDEN transparente

[![Stories in Ready](https://badge.waffle.io/mxabierto/fonden.png?label=ready&title=Ready)](https://waffle.io/mxabierto/fonden) [![Build Status](https://travis-ci.org/mxabierto/fonden.svg?branch=master)](https://travis-ci.org/mxabierto/fonden)
[![Coverage Status](https://coveralls.io/repos/mxabierto/fonden/badge.svg?branch=master&service=github)](https://coveralls.io/github/mxabierto/fonden?branch=master)

## Installation

To first install the application, from the root run the following commands `npm install` and afterwards `bower install`.

## Development

To start the application for development use `grunt serve`. This will start the connect server on the port 9000 and open the application in the browser.

All the application files are located under the __app/js__ folder and should be defined using AMD modules sintax.

## Testing

The application has the necessary setup to run E2E tests with protractor, to run them use `grunt test`, it is not necessary to start the webdriver nor the application previously, however it is necessary to update the webdriver after the initial `npm install` command.

### Updating WebDriver

In order for the application tests to run correctly is necessary to upadte the selenium webdriver that ships with protractor.

At the root of the application enter the following command: `./node_modules/protractor/bin/webdriver-manager update --standalone`.

## Production and Publishing

To build the application for production run `grunt build` which will generate the compiled files in the __dist__ folder. To publish the built application in github pages run `grunt publish`.
