'use strict';

define( function () {
    return function ( $scope, $stateParams, events, Ckan ) {
        $scope.dataset  = Ckan.dataset( $stateParams.id );

        $scope.clear    = function () {
            $scope.filter   = '';
        };
        $scope.less     = function ( e ) {
            $( e.currentTarget ).parent().fadeOut().prev().fadeIn();
        };
        $scope.more     = function ( e ) {
            $( e.currentTarget ).fadeOut().next().fadeIn();
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

            var disqus_shortname            = 'datos-mx';
            window.disqus_config            = function () {
                    this.language           = "es_MX";
                    this.page.url           = location;
                    this.page.identifier    = $scope.dataset.name;
                    this.page.title         = $scope.dataset.title;

                    this.callbacks.onReady.push( function() {
                        addAriaHiddenAttrs( $( '#disqus_thread iframe' ) );
                    });
                };

            ( function () {
                var dsq     = document.createElement( 'script' );
                dsq.type    = 'text/javascript';
                dsq.async   = true;
                dsq.src     = '//' + disqus_shortname + '.disqus.com/embed.js';
                ( document.getElementsByTagName( 'head' )[0] || document.getElementsByTagName( 'body' )[0]).appendChild( dsq );
            })();
        });
    };
});