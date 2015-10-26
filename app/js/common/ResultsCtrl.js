'use strict';

define( function () {
    return function ( $scope, $state, $stateParams, Model ) {
        var paginating              = false;
        $scope.empty                = true;
        $scope.searching            = true;
        $scope.category             = '';
        $scope.government           = '';
        $scope.clearCat             = function () {
            $scope.category     = '';
            $scope.$emit( 'CATEGORY_CLEAR' );
        };
        $scope.clearFormat          = function () {
            $scope.format   = '';
            $scope.$emit( 'FORMAT_CLEAR' );
        };
        $scope.clearGov             = function () {
            $scope.government   = '';
            $scope.$emit( 'GOVERNMENT_CLEAR' );
        };
        $scope.paginate             = function () {
            paginating  = true;
            $scope.$emit( 'PAGE_UPDATED', $scope.page );
        };
        $scope.selectDataset        = function ( dataset ) {
            $state.go( 'datasets.details', {
                id  : dataset
            });
        };
        $scope.selectGroup          = function ( group ) {
            $state.go( 'groups.details', {
                id  : group
            });
        };
        $scope.selectOrganization   = function ( organization ) {
            $state.go( 'organizations.details', {
                id  : organization
            });
        };

        $scope.$on( Model.getEvent( 'QUERYING' ), function () {
            $scope.searching    = true;
        });
        $scope.$on( Model.getEvent( 'QUERY' ), function ( e, data ) {
            e.preventDefault();

            $scope.searching    = false;
            $scope.results      = data;
            $scope.limit        = Model.getPageSize();
            $scope.total        = Model.getTotal() - 10;
            if ( $stateParams.page && !paginating ) {
                $scope.page     = $stateParams.page;
            }

            if ( $scope.results.length == 0 ) {
                $scope.empty    = true;
            } else {
                $scope.empty    = false;
            }

            if ( Model._querying == 'datasets' ) {
                for ( var i = 0; i < $scope.results.length; i++ ) {
                    for ( var j = 0; j < $scope.results[i].tags.length; j++ ) {
                        switch ( $scope.results[i].tags[j].name ) {
                            case 'salud' :
                                $scope.results[i].section   = 'health';
                                break;
                            case 'geoespacial' :
                                $scope.results[i].section   = 'geospatial';
                                break;
                            case 'seguridad-y-justicia' :
                                $scope.results[i].section   = 'security';
                                break;
                            case 'energia-y-medio-ambiente' :
                                $scope.results[i].section   = 'energy';
                                break;
                            case 'educacion' :
                                $scope.results[i].section   = 'education';
                                break;
                            case 'economia' :
                                $scope.results[i].section   = 'economy';
                                break;
                            case 'cultura-y-turismo' :
                                $scope.results[i].section   = 'culture';
                                break;
                            case 'finanzas-y-contrataciones' :
                                $scope.results[i].section   = 'finance';
                                break;
                            case 'infraestructura' :
                                $scope.results[i].section   = 'infrastructure';
                                break;
                            case 'desarrollo-sostenible' :
                                $scope.results[i].section   = 'development';
                                break;
                            case 'gobiernos-locales' :
                                $scope.results[i].section   = 'government';
                                break;
                        }
                    }
                }
            }
        });
        $scope.$on( 'GOVERNMENT_FILTER', function ( e, filter ) {
            switch ( filter ) {
                case 'federal' :
                    $scope.government  = 'Federal';
                    break;
                case 'estatal' :
                    $scope.government  = 'Estatal';
                    break;
                case 'municipal' :
                    $scope.government  = 'Municipal';
                    break;
                case 'autonomos' :
                    $scope.government  = 'Organismos Autónomos';
                    break;
            }
        });
        $scope.$on( 'CATEGORY_FILTER', function ( e, filter ) {
            if ( filter == 'all' ) {
                $scope.category     = '';
            } else {
                $scope.category     = filter.charAt( 0 ).toUpperCase() + filter.slice( 1 );
            }
        });
        $scope.$on( 'FORMAT_FILTER', function ( e, filter ) {
            if ( filter == 'all' ) {
                $scope.format       = '';
            } else {
                $scope.format       = filter.toUpperCase();
            }
        });
        $scope.$on( 'ORGANIZATIONS_FILTER', function ( e, filter ) {
            $scope.filter           = filter;
        });
        $scope.$on( 'GROUPS_FILTER', function ( e, filter ) {
            $scope.filter           = filter;
        });
    };
});