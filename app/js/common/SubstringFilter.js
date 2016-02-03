define( function () {
    return function () {
        return function ( value, start, end ) {
            return value.substring( start, end );
        };
    }
});