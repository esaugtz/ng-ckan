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

    app.config([ '$urlRouterProvider', '$locationProvider', function ( $urlRouterProvider, $locationProvider ) {
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

        var dismissed   = Cookies.get( 'dgm.poll.dismissed' ),
            setCookie   = function () {
                var date        = new Date(),
                    minutes     = 10;
                date.setTime( date.getTime() + ( minutes * 60 * 1000 ) );

                Cookies.set( 'dgm.poll.dismissed', 'dismissed', {
                    expires : date
                });
            };

        if ( dismissed !== undefined && dismissed == "dismissed" ) {
            $( '#poll-btn' ).css({ display : 'none' });
        }

        if ( $( '#poll-btn-close' ).length > 0 ) {
            $( '#poll-btn-close' ).click( function ( e ) {
                e.preventDefault();

                $( '#poll-btn' ).fadeOut();
                setCookie();
            });
        }
    }]);

    return app;
});