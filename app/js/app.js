'use strict';

define( function ( require ) {

    require( 'events' );
    require( 'common/CommonModule' );
    require( 'datasets/DatasetsModule' );
    require( 'groups/GroupsModule' );
    require( 'organizations/OrganizationsModule' );

    var app             = angular.module( 'ngCkan', [
            'angularUtils.directives.uiBreadcrumbs',
            'ngResource',
            'ui.bootstrap.pagination',
            'ui.bootstrap.tpls',
            'ui.router',
            'App.Events',
            'CommonModule',
            'DatasetsModule',
            'GroupsModule',
            'OrganizationsModule'
        ]);

    app.config([ '$urlRouterProvider', function ( $urlRouterProvider ) {
        $urlRouterProvider.otherwise( '/conjuntos' );
    }]);

    app.run([ '$rootScope', '$state', function ( $rootScope, $state ) {
        $rootScope.$state   = $state;

        $rootScope.$on( '$stateChangeSuccess', function ( e, toState ) {
            $( '.nav-tabs li' ).removeClass( 'active' );
            switch ( toState.name ) {
                case 'datasets.results' :
                case 'datasets.details' :
                    $( '#item-datasets' ).addClass( 'active' );
                    break;
                case 'groups.results' :
                case 'groups.details' :
                    $( '#item-groups' ).addClass( 'active' );
                    break;
                case 'organizations.results' :
                case 'organizations.details' :
                    $( '#item-organizations' ).addClass( 'active' );
                    break;
            }
        });
    }]);

    return app;
});