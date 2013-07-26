'use strict';

describe('Service: iTunesSearchService', function () {

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

  it('should build the search URL correctly', function(iTunesSearchService){

    var searchText = 'Rob Zombie';
    var expectedUrl = iTunesSearchService.SEARCH_URL + '?term=' + searchText;

    iTunesSearchService.searchText = searchText;
    expect(iTunesSearchService.buildSearchUrl()).toBe(expectedUrl);

    //
    // Now - go run the tests and see what happens:
    // $ grunt test
    //

  });

});
