'use strict';

define( function () {
    return function ( $rootScope, $scope, Ckan ) {
        Ckan.setModel( 'groups' );
        var retrieve    = function () {
                Ckan.groups();
            };

        $scope.clearSearch  = function () {
            $scope.keyword  = '';
        };

        $scope.$on( Ckan.getEvent( 'QUERY' ), function () {
            $scope.count    = Ckan.getTotal();
        });
        $scope.$watch( 'keyword', function ( value ) {
            $rootScope.$broadcast( 'GROUPS_FILTER', value );
        });

        retrieve();
    };
});