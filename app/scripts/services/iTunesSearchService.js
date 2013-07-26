'use strict';

if(!angular.module('itunesServiceApp')) {
	angular.module('itunesServiceApp', []);
}

angular.module('itunesServiceApp')
  .service('iTunesSearchService', function($http, $log) {

  	//
	// Create the Service
	//
	var service = {

		SEARCH_URL: 'https://itunes.apple.com/search',
		LOOKUP_URL: "https://itunes.apple.com/lookup?id=",

		//
		// Refactor:  Let's now use the state of the service object, instead lets define a 
		// contract where we have an object that contains the state for the search.  Let's
		// create a helper method that will create the object for you too!
		//
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
		// Builds the search object for you.  The result of this can be passed to the get function.
		//
		buildSearchObject: function(searchText, searchType, resultType, limit) {
			var searchObject = {
				'searchText': searchText,
				'searchType': searchType,
				'resultType': resultType,
				'limit': limit
			};

			if(!searchText) {
				throw "You must provide search text if you'd like to do a search";
			}

			return searchObject;
		},

		//
		// Adding a method that builds the URL for you, now we can test it in isolation!
		//
		buildSearchUrl: function(searchCriteria) {

			var url = this.SEARCH_URL + '?term=' + searchCriteria.searchText;
			
			if(searchCriteria.searchType) {
				url += '&attribute=' + searchCriteria.searchType;
			}
			if(searchCriteria.resultType) {
				url += '&entity=' + searchCriteria.resultType;
			}
			if(searchCriteria.limit) {
				url += "&limit=" + searchCriteria.limit;
			}

			url += '&callback=JSON_CALLBACK';

			return url;
		}
	};


	// Return the service instance:
	return service;
});
