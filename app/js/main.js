'use strict';

require.config();

define( function ( require ) {
    var app     = require( 'app' ),
        $html   = angular.element( document.getElementsByTagName( 'html' )[0] );

    angular.element().ready( function () {
        angular.bootstrap( $html, [ app.name ] );
    });
});