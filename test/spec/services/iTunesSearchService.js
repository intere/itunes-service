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

    //
    // Okay, based on the service implementation, how do I test that it's creating a valid URL?
    // I don't want to have to use the $httpBackend just to verify the URL...
    //


  });

});
