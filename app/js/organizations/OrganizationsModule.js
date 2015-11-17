'use strict';

define( function ( require ) {
    var ResultsCtrl                 = require( 'common/ResultsCtrl' );
    var OrganizationsDetailsCtrl    = require( 'organizations/OrganizationsDetailsCtrl' );
    var OrganizationsRouter         = require( 'organizations/OrganizationsRouter' );
    var OrganizationsSearchCtrl     = require( 'organizations/OrganizationsSearchCtrl' );

    var OrganizationsModule     = angular.module( 'OrganizationsModule', []);

    OrganizationsModule.config( [ '$stateProvider', OrganizationsRouter ] );

    OrganizationsModule.controller( 'OrganizationsDetailsCtrl', [ '$scope', '$state', '$stateParams', 'events', 'CkanService', OrganizationsDetailsCtrl ] );

    OrganizationsModule.controller( 'OrganizationsResultsCtrl', [ '$scope', '$state', '$stateParams', 'CkanService', '$location', ResultsCtrl ] );

    OrganizationsModule.controller( 'OrganizationsSearchCtrl', [ '$rootScope', '$scope', '$location', 'CkanService', OrganizationsSearchCtrl ] );
});