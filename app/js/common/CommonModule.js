'use strict';

define( function ( require ) {
    var CkanService     = require( 'common/CkanService' );
    var FiltersCtrl     = require( 'common/FiltersCtrl' );

    var CommonModule    = angular.module( 'CommonModule', []);

    CommonModule.controller( 'FiltersCtrl', [ '$rootScope', '$scope', FiltersCtrl ] );

    CommonModule.factory( 'CkanService', [ '$rootScope', '$resource', 'events', CkanService ] );
});