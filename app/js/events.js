'use strict';

define( function () {
    var events  = angular.module( 'App.Events', []);
    events.constant( 'events', {
        DATASETS_ERROR              : 'datasets_error',
        DATESETS_RETRIEVED          : 'datasets_retrieved',
        DATASETS_RETRIEVING         : 'datasets_retrieving',
        DATASETS_QUERY              : 'datasets_query',
        DATASETS_QUERYING           : 'datasets_querying',
        GROUPS_ERROR                : 'groups_error',
        GROUPS_RETRIEVED            : 'groups_retrieved',
        GROUPS_RETRIEVING           : 'groups_retrieving',
        GROUPS_QUERY                : 'groups_query',
        GROUPS_QUERYING             : 'groups_querying',
        ORGANIZATIONS_ERROR         : 'organizations_error',
        ORGANIZATIONS_RETRIEVED     : 'organizations_retrieved',
        ORGANIZATIONS_RETRIEVING    : 'organizations_retrieving',
        ORGANIZATIONS_QUERY         : 'organizations_query',
        ORGANIZATIONS_QUERYING      : 'organizations_querying',
        SERVICE_TIMEOUT             : 'service_timeout'
    });
});