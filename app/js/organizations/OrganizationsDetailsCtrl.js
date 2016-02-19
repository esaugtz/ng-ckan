'use strict';

define( function () {
    return function ( $scope, $state, $stateParams, events, Ckan ) {
        $scope.organization     = Ckan.organization( $stateParams.id );

        $scope.searching        = true;
        $scope.clear            = function () {
            $scope.filter   = '';
        };
        $scope.selectDataset    = function ( dataset ) {
            $state.go( 'datasets.details', {
                id  : dataset
            });
        };
        $scope.$on( events.ORGANIZATIONS_RETRIEVED, function () {
            $scope.searching    = false;
            $( '.organization-image img' ).load( function () {
                $( this ).css({
                    'margin-top'    : ( $( '.organization-image' ).height() - $( this ).height() ) / 2
                });
            });

            for ( var i = 0; i < $scope.organization.packages.length; i++ ) {
                for ( var j = 0; j < $scope.organization.packages[i].tags.length; j++ ) {
                    switch ( $scope.organization.packages[i].tags[j].name ) {
                        case 'salud' :
                            $scope.organization.packages[i].section     = 'health';
                            break;
                        case 'geoespacial' :
                            $scope.organization.packages[i].section     = 'geospatial';
                            break;
                        case 'seguridad-y-justicia' :
                            $scope.organization.packages[i].section     = 'security';
                            break;
                        case 'energia-y-medio-ambiente' :
                            $scope.organization.packages[i].section     = 'energy';
                            break;
                        case 'educacion' :
                            $scope.organization.packages[i].section     = 'education';
                            break;
                        case 'economia' :
                            $scope.organization.packages[i].section     = 'economy';
                            break;
                        case 'cultura-y-turismo' :
                            $scope.organization.packages[i].section     = 'culture';
                            break;
                        case 'finanzas-y-contrataciones' :
                            $scope.organization.packages[i].section     = 'finance';
                            break;
                        case 'infraestructura' :
                            $scope.organization.packages[i].section     = 'infrastructure';
                            break;
                        case 'desarrollo-sostenible' :
                            $scope.organization.packages[i].section     = 'development';
                            break;
                        case 'gobiernos-locales' :
                            $scope.organization.packages[i].section     = 'government';
                            break;
                    }
                }
            }

            $( '.breadcrumb li:last-child span' ).html( $scope.organization.title );
        });
    };
});