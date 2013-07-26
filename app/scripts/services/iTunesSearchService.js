'use strict';

if(!angular.module('itunesServiceApp')) {
	angular.module('itunesServiceApp', []);
}

angular.module('itunesServiceApp')
  .service('iTunesSearchService', function($http, $log) {

  	//
  	// Refactor: moving the base URLs into the service so they can be exposed externally
  	//

	// var SEARCH_URL = 'https://itunes.apple.com/search';
	// var LOOKUP_URL = "https://itunes.apple.com/lookup?id=";


	// Create the Service
	var service = {

		SEARCH_URL: 'https://itunes.apple.com/search',
		LOOKUP_URL: "https://itunes.apple.com/lookup?id=",

		searchText: undefined,
		searchType: undefined,
		resultType: undefined,
		limit: undefined,
		results: [],

		get: function() {
			var url = SEARCH_URL
				+ '?term=' + this.searchText
				+ (this.searchType ? '&attribute=' + this.searchType : "")
				+ (this.resultType ? '&entity=' + this.resultType : "")
				+ (this.limit ? "&limit=" + this.limit: "")
				+ '&callback=JSON_CALLBACK';

			$log.info("Executing Query: '" + url + "'");

			return $http.jsonp(url);
		},

		getSongs: function(albumId) {
			if(!albumId) {
				$log.error("You must provide an Album ID: bad Programmer!");
				return undefined;
			}

			var url = LOOKUP_URL
				+ albumId + "&entity=song"
				+ '&callback=JSON_CALLBACK';


			$log.info("Executing Query: '" + url + "'");

			return $http.jsonp(url);
		},

		//
		// Adding a method that builds the URL for you, now we can test it in isolation!
		//
		buildSearchUrl: function() {

			//
			// WHOA - Unit tests showed us that we have issues:
			//   TypeError: Cannot read property 'SEARCH_URL' of undefined
	    	// 		at null.<anonymous> (/Users/einternicola/code/itunes-service/test/spec/services/iTunesSearchService.js:21:42)
			//

			//
			// 
			//
			var url = this.SEARCH_URL
				+ '?term=' + this.searchText
				+ (this.searchType ? '&attribute=' + this.searchType : "")
				+ (this.resultType ? '&entity=' + this.resultType : "")
				+ (this.limit ? "&limit=" + this.limit: "")
				+ '&callback=JSON_CALLBACK';

			return url;
		}
	};


	// Return the service instance:
	return service;
});
