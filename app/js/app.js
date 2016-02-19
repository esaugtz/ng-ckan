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

    app.config([ '$urlRouterProvider', '$urlMatcherFactoryProvider', '$locationProvider', function ( $urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider ) {
        $urlMatcherFactoryProvider.strictMode( false );

        $urlRouterProvider.rule(function ($injector, $location) {
            var path = $location.url();

            // check to see if the path already has a slash where it should be
            if ( path[path.length - 1] === '/' || path.indexOf( '/?' ) > -1 ) {
                return;
            }

            if (path.indexOf( '?' ) > -1) {
                return path.replace( '?', '/?' );
            }

            return path + '/';
        });

        $urlRouterProvider.otherwise( '/conjuntos' );
        $locationProvider.html5Mode( false ).hashPrefix( "!" );
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

        $rootScope.$on( '$viewContentLoaded', function () {
            $( '#site-spinner' ).fadeOut();
        });
    }]);

    return app;
});