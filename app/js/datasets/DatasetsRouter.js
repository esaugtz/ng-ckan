'use strict';

define( function () {
    return function ( $stateProvider ) {
        $stateProvider
            .state( 'datasets', {
                abstract    : true,
                views       : {
                    'search-container'  : {
                        templateUrl     : 'partials/datasets/search.html',
                        controller      : 'DatasetsSearchCtrl'
                    }
                },
                data            : {
                    breadcrumbProxy     : 'datasets.results'
                }
            })
            .state( 'datasets.results', {
                url             : '/conjuntos?page',
                views           : {
                    'datasets-sidebar'  : {
                        templateUrl     : 'partials/datasets/filters.html',
                        controller      : 'FiltersCtrl'
                    },
                    'datasets-content'  : {
                        templateUrl     : 'partials/datasets/results.html',
                        controller      : 'DatasetsResultsCtrl'
                    }
                },
                reloadOnSearch  : false,
                data            : {
                    displayName : 'Todos los datos'
                }
            })
            .state( 'datasets.details', {
                url             : '/conjuntos/:id?page',
                views           : {
                    'search-container@' : {
                        templateUrl     : 'partials/datasets/details.html',
                        controller      : 'DatasetsDetailsCtrl'
                    }
                },
                data            : {
                    displayName : 'Conjunto de datos'
                }
            });
    };
});