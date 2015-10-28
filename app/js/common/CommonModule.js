'use strict';

define( function ( require ) {
    var CkanService     = require( 'common/CkanService' );
    var FiltersCtrl     = require( 'common/FiltersCtrl' );
    var NoSpaceFilter   = require( 'common/NoSpaceFilter' );

    var CommonModule    = angular.module( 'CommonModule', []);

    CommonModule.controller( 'FiltersCtrl', [ '$rootScope', '$scope', FiltersCtrl ] );

    CommonModule.factory( 'CkanService', [ '$rootScope', '$resource', 'events', CkanService ] );

    CommonModule.filter( 'noSpace', [ NoSpaceFilter ] );
});