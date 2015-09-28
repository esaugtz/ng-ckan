'use strict';

define( function () {
    return function ( $rootScope, $scope ) {
        $scope.govFilter    = function ( $event, filter ) {
            $event.preventDefault();
            $rootScope.$broadcast( 'GOVERNMENT_FILTER', filter );
        };
    };
});