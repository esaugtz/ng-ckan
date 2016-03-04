'use strict';

define( function () {
    return function ( $scope, $stateParams, events, Ckan ) {
        $scope.dataset  = Ckan.dataset( $stateParams.id );

        $scope.searching    = true;
        $scope.clear        = function () {
            $scope.filter   = '';
        };
        $scope.less         = function ( e ) {
            $( e.currentTarget ).parent().fadeOut().prev().fadeIn();
        };
        $scope.more         = function ( e ) {
            $( e.currentTarget ).fadeOut().next().fadeIn();
        };
        $scope.$on( events.DATASETS_RETRIEVED, function () {
            $scope.searching    = false;
            for ( var i = 0; i < $scope.dataset.extras.length; i++ ) {
                if ( $scope.dataset.extras[i].key == 'dcat_publisher_email' ) {
                    $scope.publisher_email  = $scope.dataset.extras[i].value;
                } else if ( $scope.dataset.extras[i].key == 'dcat_publisher_name' ) {
                    $scope.publisher_name   = $scope.dataset.extras[i].value;
                } else if ( $scope.dataset.extras[i].key == 'dcat_modified' ) {
                    var dcatModified        = new Date( $scope.dataset.extras[i].value );
                    $scope.dcatModified     = new Date( dcatModified.getTime() - dcatModified.getTimezoneOffset() * 60000 );
                }
            }

            $( '.organization-image img' ).load( function () {
                $( this ).css({
                    'margin-top'    : ( $( '.organization-image' ).height() - $( this ).height() ) / 2
                });
            });

            var metadataCreated                 = new Date( $scope.dataset.metadata_created ),
                metadataModified                = new Date( $scope.dataset.metadata_modified );
            $scope.dataset.metadata_created     = new Date( metadataCreated.getTime() - metadataCreated.getTimezoneOffset() * 60000 );
            $scope.dataset.metadata_modified    = new Date( metadataModified.getTime() - metadataModified.getTimezoneOffset() * 60000 );

            $( '.breadcrumb li:last-child span' ).html( $scope.dataset.title );

            var disqusShortname             = 'datosgobmx';
            window.disqus_config            = function () {
                    this.language           = 'es_MX';
                    this.page.url           = location;
                    this.page.identifier    = $scope.dataset.name;
                    this.page.title         = $scope.dataset.title;
                };

            ( function () {
                var dsq     = document.createElement( 'script' );
                dsq.type    = 'text/javascript';
                dsq.async   = true;
                dsq.src     = '//' + disqusShortname + '.disqus.com/embed.js';
                ( document.getElementsByTagName( 'head' )[0] || document.getElementsByTagName( 'body' )[0]).appendChild( dsq );
            })();
        });
    };
});