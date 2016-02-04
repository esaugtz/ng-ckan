'use strict';

define( function ( require ) {
    var CkanService         = require( 'common/CkanService' );
    var FiltersCtrl         = require( 'common/FiltersCtrl' );
    var NoSpaceFilter       = require( 'common/NoSpaceFilter' );
    var SubstringFilter     = require( 'common/SubstringFilter' );
    var SpinnerDirective    = require( 'common/SpinnerDirective' );

    var CommonModule        = angular.module( 'CommonModule', []);

    CommonModule.controller( 'FiltersCtrl', [ '$rootScope', '$scope', '$location', FiltersCtrl ] );

    CommonModule.directive( 'loader', [ SpinnerDirective ] );

    CommonModule.factory( 'CkanService', [ '$rootScope', '$resource', 'events', CkanService ] );

    CommonModule.filter( 'noSpace', [ NoSpaceFilter ] );

    CommonModule.filter( 'substring', [ SubstringFilter ] );
});