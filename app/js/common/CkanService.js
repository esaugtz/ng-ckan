'use strict';

define( function () {
    return function ( $rootScope, $resource, events ) {
        var Service = {
            _error          : false,

            _querying       : '',

            _timeout        : 5000,

            _total          : 0,

            _resource       : $resource( 'http://catalogo.datos.gob.mx/api/3/action/:action', null, {
                dataset                 : {
                    method              : 'GET',
                    isArray             : false,
                    transformResponse   : function ( data ) {
                        var response    = angular.fromJson( data );

                        return response.result;
                    }
                },
                datasets                : {
                    method              : 'GET',
                    isArray             : true,
                    transformResponse   : function ( data ) {
                        var response    = angular.fromJson( data );

                        Service._total  = response.result.count;

                        return response.result.results;
                    }
                },
                group                   : {
                    method              : 'GET',
                    isArray             : false,
                    transformResponse   : function ( data ) {
                        var response    = angular.fromJson( data );

                        return response.result;
                    }
                },
                groups                  : {
                    method              : 'GET',
                    isArray             : true,
                    transformResponse   : function ( data ) {
                        var response    = angular.fromJson( data );

                        Service._total  = response.result.length;

                        return response.result;
                    }
                },
                organization            : {
                    method              : 'GET',
                    isArray             : false,
                    transformResponse   : function ( data ) {
                        var response    = angular.fromJson( data );

                        return response.result;
                    }
                },
                organizations           : {
                    method              : 'GET',
                    isArray             : true,
                    transformResponse   : function ( data ) {
                        var response    = angular.fromJson( data );

                        Service._total  = response.result.length;

                        return response.result;
                    }
                }
            }),

            _setTimeout     : function () {
                var that    = this;

                this._error     = false;
                return setTimeout( function () {
                    that._error = true;
                    $rootScope.$broadcast( events.SERVICE_TIMEOUT );
                }, this._timeout );
            },

            getEvent        : function ( event ) {
                /* istanbul ignore next */
                switch ( event ) {
                    case 'ERROR' :
                        if ( this._querying == 'datasets' ) {
                            return events.DATASETS_ERROR;
                        } else if ( this._querying == 'groups' ) {
                            return events.GROUPS_ERROR;
                        } else if ( this._querying == 'organizations' ) {
                            return events.ORGANIZATIONS_ERROR;
                        }
                        break;
                    case 'QUERY' :
                        if ( this._querying == 'datasets' ) {
                            return events.DATASETS_QUERY;
                        } else if ( this._querying == 'groups' ) {
                            return events.GROUPS_QUERY;
                        } else if ( this._querying == 'organizations' ) {
                            return events.ORGANIZATIONS_QUERY;
                        }
                        break;
                    case 'QUERYING' :
                        if ( this._querying == 'datasets' ) {
                            return events.DATASETS_QUERYING;
                        } else if ( this._querying == 'groups' ) {
                            return events.GROUPS_QUERYING;
                        } else if ( this._querying == 'organizations' ) {
                            return events.ORGANIZATIONS_QUERYING;
                        }
                }
            },

            getPageSize     : function () {
                return 10;
            },

            getTotal        : function () {
                return this._total;
            },

            dataset         : function ( id ) {
                $rootScope.$broadcast( events.DATASETS_RETRIEVING );
                return this._resource.dataset({
                        action  : 'package_show',
                        id      : id
                    },
                    function ( data ) {
                        while( !data.$resolved ) {
                            // Resolving
                        }

                        $rootScope.$broadcast( events.DATASETS_RETRIEVED, data );
                    });
            },

            datasets        : function ( q, order, skip ) {
                $rootScope.$broadcast( events.DATASETS_QUERYING );

                var that        = this,
                    timeout     = this._setTimeout();

                return this._resource.datasets({
                        action  : 'package_search',
                        q       : q,
                        rows    : 10,
                        start   : skip,
                        sort    : order
                    },
                    function ( data ) {
                        while( !data.$resolved ) {
                            if ( that._error ) {
                                return;
                            }
                        }

                        clearTimeout( timeout );
                        $rootScope.$broadcast( events.DATASETS_QUERY, data );
                    });
            },

            group           : function ( group ) {
                $rootScope.$broadcast( events.GROUPS_RETRIEVING );
                return this._resource.group({
                        action      : 'group_show',
                        all_fields  : 'true',
                        id          : group
                    },
                    function ( data ) {
                        while( !data.$resolved ) {
                            // Resolving
                        }

                        $rootScope.$broadcast( events.GROUPS_RETRIEVED, data );
                    });
            },

            groups          : function () {
                $rootScope.$broadcast( events.GROUPS_QUERYING );

                var that        = this,
                    timeout     = this._setTimeout();

                return this._resource.groups({
                        action      : 'group_list',
                        all_fields  : 'true'
                    },
                    function ( data ) {
                        while( !data.$resolved ) {
                            if ( that._error ) {
                                return;
                            }
                        }

                        clearTimeout( timeout );
                        $rootScope.$broadcast( events.GROUPS_QUERY, data );
                    });
            },

            organization    : function ( organization ) {
                $rootScope.$broadcast( events.ORGANIZATIONS_RETRIEVING );
                return this._resource.organization({
                        action      : 'organization_show',
                        all_fields  : true,
                        id          : organization
                    },
                    function ( data ) {
                        while( !data.$resolved ) {
                            // Resolving
                        }

                        $rootScope.$broadcast( events.ORGANIZATIONS_RETRIEVED, data );
                    });
            },

            organizations   : function () {
                $rootScope.$broadcast( events.ORGANIZATIONS_QUERYING );

                var that        = this,
                    timeout     = this._setTimeout();

                return this._resource.organizations({
                        action      : 'organization_list',
                        all_fields  : true
                    },
                    function ( data ) {
                        while( !data.$resolved ) {
                            if ( that._error ) {
                                return;
                            }
                        }

                        clearTimeout( timeout );
                        $rootScope.$broadcast( events.ORGANIZATIONS_QUERY, data );
                    });
            },

            setModel        : function ( model ) {
                this._querying  = model;
            }
        };

        return Service;
    };
});