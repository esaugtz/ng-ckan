'use strict';

define( function () {
    return function ( $scope, $location, Ckan ) {
        Ckan.setModel( 'datasets' );
        var category    = '',
            format      = '',
            query       = '',
            government  = '',
            search      = $location.search(),
            skip        = 0,
            setQuery    = function () {
                query   = '';
                if ( $scope.keyword ) {
                    var q       = $scope.keyword,
                        exp     = q.split( ' '  ).join( '* OR ' );
                    q           = q.split( ' ' ).join( ' OR ' );
                    query       += 'title:(' + q + ' OR ' + exp + '*)';
                }

                if ( government ) {
                    $( '.gov-filter' ).removeClass( 'active' );
                    $( '#item-' + government ).addClass( 'active' );
                    query       += '+tags:(' + government + ')';
                }

                if ( category ) {
                    var item    = category.indexOf( ' ' ) != -1 ? category.substring( 0, category.indexOf( ' ' ) ) : category;
                    $( '.category-filter' ).removeClass( 'active' );
                    $( '#item-' + item ).addClass( 'active' );
                    query       += '+tags:' + category.replace( / /g, '-' );
                }

                if ( format ) {
                    query       += '+res_format:' + format;
                }
            },
            retrieve    = function () {
                setQuery();
                Ckan.datasets( query, $scope.query.order, skip );
            };

        $scope.query    = {};

        if ( search.q ) {
            $scope.keyword  = decodeURIComponent( search.q );
        }
        if ( search.categoria ) {
            category    = search.categoria;
            $scope.$emit( 'CATEGORY_FILTER', category );
        }
        if ( search.formato ) {
            format      = search.formato;
            $scope.$emit( 'FORMAT_FILTER', format );
        }
        if ( search.gob ) {
            government  = search.gob;
            $scope.$emit( 'GOVERNMENT_FILTER', government );
        }
        if ( search.page ) {
            skip        = ( search.page - 1 ) * 10;
        }
        $scope.query.order  = search.orden ? decodeURIComponent( search.orden ) : 'score desc, dcat_modified desc';

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
        $scope.sort         = function () {
            if ( $scope.query.order != 'score desc, metadata_modified desc' ) {
                $location.search( 'orden', encodeURIComponent( $scope.query.order ) );
            } else {
                $location.search( 'orden', null );
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
            government  = filter;
            $location.search( 'gob', filter );
            retrieve();
        });
        $scope.$on( 'CATEGORY_FILTER', function ( e, filter ) {
            if ( filter == 'all' ) {
                category    = '';
                $location.search( 'categoria', null );
            } else {
                category    = filter;
                $location.search( 'categoria', filter );
            }
            retrieve();
        });
        $scope.$on( 'FORMAT_FILTER', function ( e, filter ) {
            format  = filter;
            $location.search( 'formato', filter );
            retrieve();
        });
        $scope.$on( 'GOVERNMENT_CLEAR', function () {
            $( '.gov-filter' ).removeClass( 'active' );
            $location.search( 'gob', null );
            government  = '';
            retrieve();
        });
        $scope.$on( 'CATEGORY_CLEAR', function () {
            $( '.category-filter' ).removeClass( 'active' );
            $( '#item-all' ).addClass( 'active' );
            $location.search( 'categoria', null );
            category    = '';
            retrieve();
        });
        $scope.$on( 'FORMAT_CLEAR', function () {
            $( '.format-filter' ).removeClass( 'active' );
            $location.search( 'formato', null );
            format  = '';
            retrieve();
        });

        retrieve();
    };
});