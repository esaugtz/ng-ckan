'use strict';

describe( 'App', function () {
    var hasClass    = function ( element, cls ) {
            return element.getAttribute( 'class' ).then( function ( classes ) {
                return classes.split( ' ' ).indexOf( cls ) !== -1;
            });
        };

    it ( 'should set the browser window size', function () {
        browser.driver.manage().window().setSize( 1200, 980 );
    });

    it ( 'should have correctly boostraped AngularJS', function () {
        browser.get( '/' );

        expect( element.all( by.css( 'html.ng-scope' ) ).count() ).toBe( 1 );
    });

    it ( 'should navigate to the second page of the results', function () {
        element.all( by.css( '.pagination-sm li' ) ).get( 3 ).element( by.tagName( 'a' ) ).click();
    });

    it ( 'should mantain the page after a refresh and navigate back to the first page', function () {
        browser.refresh();

        element.all( by.css( '.pagination-sm li' ) ).get( 2 ).element( by.tagName( 'a' ) ).click().then( function () {
            expect( browser.getLocationAbsUrl() ).toMatch( '/conjuntos' );
        });
    });

    it ( 'should filter the search results', function () {
        element( by.css( '#search-keyword' ) ).sendKeys( 'presupuesto' );
        browser.actions().sendKeys( protractor.Key.ENTER ).perform();
    });

    it ( 'should clear the search by sending an empty string', function () {
        element( by.css( '#search-keyword' ) ).clear();
        browser.actions().sendKeys( protractor.Key.ENTER ).perform();

        expect( browser.getLocationAbsUrl() ).toMatch( '/conjuntos' );
    });

    it ( 'should preserve the search keyword when refreshing the browser', function () {
        browser.get( '/#!/conjuntos/?q=presupuesto' );

        element( by.css( '#search-keyword' ) ).getAttribute( 'value' ).then( function ( value ) {
            expect( value ).toBe( 'presupuesto' );
        });
    });

    it ( 'should clear the search query previously set', function () {
        element( by.css( '[ng-click="clearSearch()"]' ) ).click();
    });

    it ( 'should filter the datasets by category', function () {
        element( by.css( '#item-seguridad a' ) ).click();

        expect( element.all( by.css( '[ng-click="clearCat()"]' ) ).count() ).toBe( 1 );
    });

    it ( 'should clear the category filter previously set', function () {
        element( by.css( '[ng-click="clearCat()"]' ) ).click();
    });

    it ( 'should filter the datasets by category', function () {
        element( by.css( '#item-economia a' ) ).click();

        expect( element.all( by.css( '[ng-click="clearCat()"]' ) ).count() ).toBe( 1 );

        element( by.css( '#item-all a' ) ).click();
    });

    it ( 'should filter datasets from the URL', function () {
        browser.get( '/#!/conjuntos?categoria=seguridad y justicia&gob=estatal' );
    });

    it ( 'should filter the datasets by government level', function () {
        element( by.css( '#item-federal a' ) ).click();

        expect( element.all( by.css( '[ng-click="clearGov()"]' ) ).count() ).toBe( 1 );

        element( by.css( '#item-state a' ) ).click();

        expect( element.all( by.css( '[ng-click="clearGov()"]' ) ).count() ).toBe( 1 );

        element( by.css( '#item-municipal a' ) ).click();

        expect( element.all( by.css( '[ng-click="clearGov()"]' ) ).count() ).toBe( 1 );

        element( by.css( '#item-autonomous a' ) ).click();

        expect( element.all( by.css( '[ng-click="clearGov()"]' ) ).count() ).toBe( 1 );
    });

    it ( 'should clear the government filter previously set', function () {
        element( by.css( '[ng-click="clearGov()"]' ) ).click();
    });

    it ( 'should navigate to the datasets details state', function () {
        element.all( by.css( '#datasets-content table > tbody > tr' ) ).first().click().then( function () {
            expect( browser.getLocationAbsUrl() ).toMatch( '/conjuntos' );
        });
    });

    it ( 'should filter and clear the dataset available resources', function () {
        element( by.css( '#filter-keyword' ) ).sendKeys( 'obra' );

        element( by.css( '[ng-click="clear()"]' ) ).click();
    });

    it ( 'should navigate to the application organizations state', function () {
        element.all( by.css( '.nav-tabs li' ) ).get( 1 ).element( by.tagName( 'a' ) ).click().then( function () {
            expect( browser.getLocationAbsUrl() ).toMatch( '/instituciones' );
        });
    });

    it ( 'should navigate to the organization details state', function () {
        element.all( by.css( '.organization-item' ) ).first().click().then( function () {
            expect( browser.getLocationAbsUrl() ).toMatch( '/instituciones' );
        });
    });

    it ( 'should filter and clear the organization available resources', function () {
        element( by.css( '#filter-keyword' ) ).sendKeys( 'obra' );

        element( by.css( '[ng-click="clear()"]' ) ).click();
    });

    it ( 'should navigate to the organization first dataset', function () {
        element.all( by.css( '.data > tbody > tr' ) ).first().click().then( function () {
            expect( browser.getLocationAbsUrl() ).toMatch( '/conjuntos' );
        });
    });

    it ( 'should navigate to the application groups state', function () {
        element.all( by.css( '.nav-tabs li' ) ).get( 2 ).element( by.tagName( 'a' ) ).click().then( function () {
            expect( browser.getLocationAbsUrl() ).toMatch( '/grupos' );
        });
    });

    it ( 'should navigate to the group details state', function () {
        element.all( by.css( '.group-item' ) ).get( 1 ).click().then( function () {
            expect( browser.getLocationAbsUrl() ).toMatch( '/grupos' );
        });
    });

    it ( 'should filter and clear the group available resources', function () {
        element( by.css( '#filter-keyword' ) ).sendKeys( 'obra' );

        element( by.css( '[ng-click="clear()"]' ) ).click();
    });

    it ( 'should navigate to the organization first dataset', function () {
        element.all( by.css( '.data > tbody > tr' ) ).first().click().then( function () {
            expect( browser.getLocationAbsUrl() ).toMatch( '/conjuntos' );
        });
    });
});