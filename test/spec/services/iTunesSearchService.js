'use strict';

describe('Service: iTunesSearchService', function () {

  var SEARCH_TEXT = "Rob Zombie";
  var SEARCH_TYPE = "Artist";
  var RESULT_TYPE = "Album";
  var LIMIT = 100;

  // load the service's module
  beforeEach(module('itunesServiceApp'));

  // instantiate service
  var iTunesSearchService;
  beforeEach(inject(function (_iTunesSearchService_) {
    iTunesSearchService = _iTunesSearchService_;
  }));


  it('should do something', function () {
    expect(!!iTunesSearchService).toBe(true);
  });

  //
  // Verifies that we correctly build a Search Object:
  //
  it('should build a search criteria object for us', inject(function($log, iTunesSearchService) {

    // Test 1: throwing an exception:
    failBuildObject();
    failBuildObject(undefined, SEARCH_TYPE);
    failBuildObject(undefined, undefined, RESULT_TYPE);
    failBuildObject(undefined, undefined, undefined, LIMIT);
    failBuildObject(undefined, SEARCH_TYPE, RESULT_TYPE, LIMIT);

    // Test 2: test valid object building cases:
    testBuildObject(SEARCH_TEXT);
    testBuildObject(SEARCH_TEXT, SEARCH_TYPE);
    testBuildObject(SEARCH_TEXT, undefined, RESULT_TYPE);
    testBuildObject(SEARCH_TEXT, undefined, undefined, LIMIT);
    testBuildObject(SEARCH_TEXT, undefined, RESULT_TYPE, LIMIT);
    testBuildObject(SEARCH_TEXT, SEARCH_TYPE, RESULT_TYPE, LIMIT);

    //
    // Test Helper Functions:
    //
    function testBuildObject(sText, sType, rType, lim) {
      var result = iTunesSearchService.buildSearchObject(sText, sType, rType, lim);
      expect(result).toNotBe(undefined);
      expect(result.searchText).toBe(sText);
      expect(result.searchType).toBe(sType);
      expect(result.resultType).toBe(rType);
      expect(result.limit).toBe(lim);
    }

    function failBuildObject(sText, sType, rType, lim) {
      try {
        var result = iTunesSearchService.buildSearchObject(sText, sType, rType, lim); 
        // if we got here, we didn't throw an exception
        expect(false).toBe(true);
      } catch(reason) {
        // Expected behavior        
      }
    }
  }));

  //
  // Verifies that we correctly build the URL.
  //
  it('should build the search URL correctly', inject(function(iTunesSearchService){

    testBuildUrlFor(SEARCH_TEXT);
    testBuildUrlFor(SEARCH_TEXT, SEARCH_TYPE);
    testBuildUrlFor(SEARCH_TEXT, SEARCH_TYPE, RESULT_TYPE);
    testBuildUrlFor(SEARCH_TEXT, SEARCH_TYPE, RESULT_TYPE, LIMIT);
    testBuildUrlFor(SEARCH_TEXT, SEARCH_TYPE, undefined, LIMIT);
    testBuildUrlFor(SEARCH_TEXT, undefined, RESULT_TYPE, LIMIT);
    testBuildUrlFor(SEARCH_TEXT, undefined, undefined, LIMIT);

    //
    // Test Helper function
    //
    function testBuildUrlFor(sText, sType, rType, lim) {

      // First - build the expected URL:
      var expectedUrl = iTunesSearchService.SEARCH_URL + "?term=" + sText;
      if(sType) {
        expectedUrl += "&attribute=" + sType;
      }
      if(rType) {
        expectedUrl += "&entity=" + rType;
      }
      if(lim) {
        expectedUrl += "&limit=" + lim;
      }
      expectedUrl += "&callback=JSON_CALLBACK";

      // Now get the generated one:
      var actualUrl = iTunesSearchService.buildSearchUrl(iTunesSearchService.buildSearchObject(sText, sType, rType, lim));

      // Now perform the verification
      expect(actualUrl).toBe(expectedUrl);      
    }

  }));

});
