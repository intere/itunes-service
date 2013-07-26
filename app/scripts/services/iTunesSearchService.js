'use strict';

if(!angular.module('itunesServiceApp')) {
	angular.module('itunesServiceApp', []);
}

angular.module('itunesServiceApp')
  .service('iTunesSearchService', function($http, $log) {

	var SEARCH_URL = 'https://itunes.apple.com/search';
	var LOOKUP_URL = "https://itunes.apple.com/lookup?id=";


	// Create the Service
	var service = {

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
		}
	};


	// Return the service instance:
	return service;
});
