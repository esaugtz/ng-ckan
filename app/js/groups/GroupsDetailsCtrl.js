'use strict';

define( function () {
    return function ( $scope, $state, $stateParams, events, Ckan ) {
        $scope.group            = Ckan.group( $stateParams.id );

        $scope.searching        = true;
        $scope.clear            = function () {
            $scope.filter   = '';
        };
        $scope.selectDataset    = function ( dataset ) {
            $state.go( 'datasets.details', {
                id  : dataset
            });
        };
        $scope.$on( events.GROUPS_RETRIEVED, function () {
            $scope.searching    = false;
            $( '.organization-image img' ).load( function () {
                $( this ).css({
                    'margin-top'    : ( $( '.organization-image' ).height() - $( this ).height() ) / 2
                });
            });

            for ( var i = 0; i < $scope.group.packages.length; i++ ) {
                for ( var j = 0; j < $scope.group.packages[i].tags.length; j++ ) {
                    switch ( $scope.group.packages[i].tags[j].name ) {
                        case 'salud' :
                            $scope.group.packages[i].section    = 'health';
                            break;
                        case 'geoespacial' :
                            $scope.group.packages[i].section    = 'geospatial';
                            break;
                        case 'seguridad-y-justicia' :
                            $scope.group.packages[i].section    = 'security';
                            break;
                        case 'energia-y-medio-ambiente' :
                            $scope.group.packages[i].section    = 'energy';
                            break;
                        case 'educacion' :
                            $scope.group.packages[i].section    = 'education';
                            break;
                        case 'economia' :
                            $scope.group.packages[i].section    = 'economy';
                            break;
                        case 'cultura-y-turismo' :
                            $scope.group.packages[i].section    = 'culture';
                            break;
                        case 'finanzas-y-contrataciones' :
                            $scope.group.packages[i].section    = 'finance';
                            break;
                        case 'infraestructura' :
                            $scope.group.packages[i].section    = 'infrastructure';
                            break;
                        case 'desarrollo-sostenible' :
                            $scope.group.packages[i].section    = 'development';
                            break;
                        case 'gobiernos-locales' :
                            $scope.group.packages[i].section    = 'government';
                            break;
                    }
                }
            }

            $( '.breadcrumb li:last-child span' ).html( $scope.group.title );
        });
    };
});