'use strict';

define( function () {
    return function ( $scope, $stateParams, events, Ckan ) {
        $scope.dataset  = Ckan.dataset( $stateParams.id );

        $scope.clear    = function () {
            $scope.filter   = '';
        };
        $scope.$on( events.DATASETS_RETRIEVED, function () {
            for ( var i = 0; i < $scope.dataset.extras.length; i++ ) {
                if ( $scope.dataset.extras[i].key == 'dcat_publisher_email' ) {
                    $scope.publisher_email  = $scope.dataset.extras[i].value;
                } else if ( $scope.dataset.extras[i].key == 'dcat_publisher_name' ) {
                    $scope.publisher_name   = $scope.dataset.extras[i].value;
                }
            }

            $( '.organization-image img' ).load( function () {
                $( this ).css({
                    'margin-top'    : ( $( '.organization-image' ).height() - $( this ).height() ) / 2
                });
            });

            $( '.breadcrumb li:last-child span' ).html( $scope.dataset.title );
        });
    };
});