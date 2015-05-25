'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

var data  = require( '../mock/datasets.json' );

describe( 'datasets', function() {
  var datasetList;

  beforeEach( function() {
    browser.addMockModule( 'ngCkanApp', function () {
      var data  = arguments[0];

      angular.module( 'ngCkanApp' )
        .service( 'ckanService', [ '$q', function ( $q ) {
          this.countDatasets  = function ( query ) {
            var deferred  = $q.defer();
            deferred.resolve({ count : 10 });
            return deferred.promise;
          };

          this.listDatasets   = function ( start, query ) {
            var deferred  = $q.defer();
            deferred.resolve({ datasets: data.result.results, resultsCount : data.result.count });
            return deferred.promise;
          };
        }]);
    }, data );

    datasetList = element.all( by.repeater( 'dataset in datasets' ) );
  });


  it( 'should render datasets when user navigates to /datasets', function() {
    browser.get( '/#/conjuntos' );

    expect( element.all( by.css( '.ng-binding' ) ).first().getText() ).
      toMatch( /\d+ conjuntos de datos/ );
  });

  it ( 'should list the government level filtering', function () {
    expect( element( by.css( '[ng-show="gov_federal"]' ) ).all( by.tagName( 'a' ) ).first().getText() ).toMatch( /Federal *\d*/ );
    expect( element( by.css( '[ng-show="gov_state"]' ) ).all( by.tagName( 'a' ) ).first().getText() ).toMatch( /Estatal *\d*/ );
    expect( element( by.css( '[ng-show="gov_municipal"]' ) ).all( by.tagName( 'a' ) ).first().getText() ).toMatch( /Municipal *\d*/ );
  });

  it ( 'should apply a government level filter in the URL and remove two of the three filter elements in the menu', function () {
    element( by.css( '[ng-show="gov_federal"]' ) ).all( by.tagName( 'a' ) ).first().click().then( function () {
      expect( browser.getCurrentUrl() ).toBe( browser.baseUrl + '#/conjuntos?gob=federal' );

      expect( element( by.css( '.page-filters' ) ).all( by.css( '.ng-hide' ) ).count() ).toBe( 2 );
    });
  });

  it ( 'should remove the previously applied government level filtering', function () {
    element( by.css( '[ng-click="clearGov()"]' ) ).click().then( function () {
      expect( browser.getCurrentUrl() ).toBe( browser.baseUrl + '#/conjuntos' );
    });
  });

  it( 'should list datasets', function() {
    expect( datasetList.count() ).toEqual( 10 );

    var dateInLongFormat  = /\| \w+ \d+, \d+/;
    expect( datasetList.get( 1 ).getText() ).toMatch( dateInLongFormat );
  });

  it( 'root should redirect to datasets', function() {
    browser.get( '/' );

    expect( browser.getCurrentUrl() ).toEqual( browser.baseUrl + '#/conjuntos' );
  });

  it( 'should link to dataset\'s detailed information', function() {
    // Click on a dataset link
    element.all( by.css( '.dataset-item' ) ).first().click();
    // Find a download link
    var content = element( by.css( '[ng-view]' ) ).getText();
    expect( content ).toMatch( /Datos y recursos/ );
  });
});