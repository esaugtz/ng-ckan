'use strict';

define( function () {
    return function ( $rootScope, $scope, $location, Ckan ) {
        Ckan.setModel( 'organizations' );
        var retrieve        = function () {
                Ckan.organizations();
            };

        $scope.clearSearch  = function () {
            $scope.keyword  = '';
            $rootScope.$broadcast( 'ORGANIZATIONS_FILTER', '' );
        };

        $scope.$on( Ckan.getEvent( 'QUERY' ), function () {
            $scope.count    = Ckan.getTotal();
        });
        $scope.$watch( 'keyword', function ( value ) {
            if ( value ) {
                $rootScope.$broadcast( 'ORGANIZATIONS_FILTER', value );
            }
        });

        retrieve();
    };
});