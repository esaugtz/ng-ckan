'use strict';

define( function ( require ) {
    var GroupsDetailsCtrl   = require( 'groups/GroupsDetailsCtrl' );
    var GroupsRouter        = require( 'groups/GroupsRouter' );
    var GroupsSearchCtrl    = require( 'groups/GroupsSearchCtrl' );
    var ResultsCtrl         = require( 'common/ResultsCtrl' );

    var GroupsModule        = angular.module( 'GroupsModule', []);

    GroupsModule.config( [ '$stateProvider', GroupsRouter ] );

    GroupsModule.controller( 'GroupsDetailsCtrl', [ '$scope', '$state', '$stateParams', 'events', 'CkanService', GroupsDetailsCtrl ] );

    GroupsModule.controller( 'GroupsResultsCtrl', [ '$scope', '$state', '$stateParams', 'CkanService', ResultsCtrl ] );

    GroupsModule.controller( 'GroupsSearchCtrl', [ '$rootScope', '$scope', 'CkanService', GroupsSearchCtrl ] );
});