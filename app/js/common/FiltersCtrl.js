'use strict';

define( function () {
    return function ( $rootScope, $scope ) {
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
    };
});