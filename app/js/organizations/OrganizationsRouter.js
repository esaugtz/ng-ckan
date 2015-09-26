'use strict';

define( function () {
    return function ( $stateProvider ) {
        $stateProvider
            .state( 'organizations', {
                abstract    : true,
                views       : {
                    'search-container'  : {
                        templateUrl     : 'partials/datasets/search.html',
                        controller      : 'OrganizationsSearchCtrl'
                    }
                }
            })
            .state( 'organizations.results', {
                url             : '/instituciones?page',
                views           : {
                    'datasets-sidebar'  : {
                        templateUrl     : 'partials/datasets/filters.html'
                    },
                    'datasets-content'  : {
                        templateUrl     : 'partials/organizations/results.html',
                        controller      : 'OrganizationsResultsCtrl'
                    }
                },
                reloadOnSearch  : false
            })
            .state( 'organizations.details', {
                url             : '/instituciones/:id?page',
                views           : {
                    'search-container@' : {
                        templateUrl     : 'partials/organizations/details.html',
                        controller      : 'OrganizationsDetailsCtrl'
                    }
                }
            });
    };
});