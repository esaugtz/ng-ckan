'use strict';

define( function () {
    return function () {
        return function ( value ) {
            return !value ? '' : value.replace( / /g, '' );
        };
    };
});