'use strict';

define( function () {
    return function ( $rootScope, $scope, $location ) {
        var search      = $location.search();

        $scope.categoryFilter   = function ( $event, category ) {
            $event.preventDefault();
            $rootScope.$broadcast( 'CATEGORY_FILTER', category );
        };
        $scope.govFilter        = function ( $event, filter ) {
            $event.preventDefault();
            $rootScope.$broadcast( 'GOVERNMENT_FILTER', filter );
        };
        $scope.formatFilter     = function ( $event, format ) {
            $event.preventDefault();
            $rootScope.$broadcast( 'FORMAT_FILTER', format );
        };

        if ( search.categoria ) {
            var category    = search.categoria;
            $rootScope.$broadcast( 'CATEGORY_FILTER', category );
        }
        if ( search.formato ) {
            var format      = search.formato;
        }
        if ( search.gob ) {
            var government  = search.gob;
        }
    };
});