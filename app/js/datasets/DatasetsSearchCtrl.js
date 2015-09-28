'use strict';

define( function () {
    return function ( $scope, $location, Ckan ) {
        Ckan.setModel( 'datasets' );
        var query       = '',
            government  = '',
            search      = $location.search(),
            skip        = 0,
            setQuery    = function () {
                if ( $scope.keyword ) {
                    var q       = $scope.keyword,
                        exp     = q.split( ' '  ).join( '* OR ' );
                    q           = q.split( ' ' ).join( ' OR ' );
                    query       += 'title:(' + q + ' OR ' + exp + '*)';
                } else {
                    query       = '';
                }

                if ( government ) {
                    query       += '+vocab_gov_types:(' + government + ')';
                }
            },
            retrieve    = function () {
                setQuery();
                Ckan.datasets( query, skip );
            };

        if ( search.q ) {
            $scope.keyword  = decodeURIComponent( search.q );
        }
        if ( search.gob ) {
            government  = search.gob;
        }
        if ( search.page ) {
            skip        = ( search.page - 1 ) * 10;
        }

        $scope.clearSearch  = function () {
            $scope.keyword  = '';
            $location.search( 'q', null );
            retrieve();
        };
        $scope.search       = function () {
            if ( $scope.keyword ) {
                $location.search( 'q', encodeURIComponent( $scope.keyword ) );
            } else {
                $location.search( 'q', null );
            }

            retrieve();
        };
        $scope.$on( Ckan.getEvent( 'QUERY' ), function () {
            $scope.count    = Ckan.getTotal();
        });
        $scope.$on( 'PAGE_UPDATED', function ( e, page ) {
            e.preventDefault();

            if ( page > 1 ) {
                $location.search( 'page', page );
            } else {
                $location.search( 'page', null );
            }

            skip        = ( page - 1 ) * 10;
            retrieve();
        });
        $scope.$on( 'GOVERNMENT_FILTER', function ( e, filter ) {
            switch ( filter ) {
                case 'federal' :
                    government  = 'Federal';
                    break;
                case 'state' :
                    government  = 'Estatal';
                    break;
                case 'municipal' :
                    government  = 'Municipal';
                    break;
                case 'independent' :
                    government  = 'Autonomos'
                    break;
            }

            $location.search( 'gob', government );
            retrieve();
        });

        retrieve();
    };
});