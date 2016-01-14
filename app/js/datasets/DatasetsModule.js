'use strict';

define( function ( require ) {
    var DatasetsDetailsCtrl = require( 'datasets/DatasetsDetailsCtrl' );
    var DatasetsRouter      = require( 'datasets/DatasetsRouter' );
    var DatasetsSearchCtrl  = require( 'datasets/DatasetsSearchCtrl' );
    var ResultsCtrl         = require( 'common/ResultsCtrl' );

    var DatasetsModule      = angular.module( 'DatasetsModule', []);

    DatasetsModule.config( [ '$stateProvider', DatasetsRouter ] );

    DatasetsModule.controller( 'DatasetsDetailsCtrl', [ '$scope', '$stateParams', 'events', 'CkanService', DatasetsDetailsCtrl ] );

    DatasetsModule.controller( 'DatasetsResultsCtrl', [ '$scope', '$state', '$stateParams', 'CkanService', '$location', 'events', ResultsCtrl ] );

    DatasetsModule.controller( 'DatasetsSearchCtrl', [ '$scope', '$location', 'CkanService', DatasetsSearchCtrl ] );
});