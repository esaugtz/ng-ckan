'use strict';

define( function () {
    return function ( $stateProvider ) {
        $stateProvider
            .state( 'groups', {
                abstract    : true,
                views       : {
                    'search-container'  : {
                        templateUrl     : 'partials/datasets/search.html',
                        controller      : 'GroupsSearchCtrl'
                    }
                },
                data            : {
                    breadcrumbProxy     : 'groups.results'
                }
            })
            .state( 'groups.results', {
                url             : '/grupos/?page',
                views           : {
                    'datasets-sidebar'  : {
                        templateUrl     : 'partials/datasets/filters.html'
                    },
                    'datasets-content'  : {
                        templateUrl     : 'partials/groups/results.html',
                        controller      : 'GroupsResultsCtrl'
                    }
                },
                reloadOnSearch  : false,
                data            : {
                    displayName         : 'Grupos'
                }
            })
            .state( 'groups.details', {
                url             : '/grupos/:id/?page',
                views           : {
                    'search-container@' : {
                        templateUrl     : 'partials/groups/details.html',
                        controller      : 'GroupsDetailsCtrl'
                    }
                },
                data            : {
                    displayName         : 'Grupo'
                }
            });
    };
});