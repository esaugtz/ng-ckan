'use strict';

define( function () {
    return function ( $scope, $state, $stateParams, Model ) {
        var paginating              = false;
        $scope.searching            = true;
        $scope.category             = '';
        $scope.government           = '';
        $scope.clearCat             = function () {
            $scope.category     = '';
            $scope.$emit( 'CATEGORY_CLEAR' );
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
            $scope.total        = Model.getTotal();
            if ( $stateParams.page && !paginating ) {
                $scope.page     = $stateParams.page;
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
                    $scope.government  = 'Organismos Autónomos'
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
    };
});