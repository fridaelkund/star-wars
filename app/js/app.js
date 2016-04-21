var StarWarsApp = angular.module('StarWars', ['ngRoute', 'ngResource']);

StarWarsApp.config(['$routeProvider',
	function($routeProvider) { 
		$routeProvider.
			when('/home', {
				templateUrl: 'partials/start.html'
			}).
			when('/play', {
				templateUrl: 'partials/select-char.html',
				controller: 'selectCtrl'
			}).
			when('/hair', {
				templateUrl: 'partials/new-char.html',
				controller: 'inputCtrl'
			}).
			when('/select', {
				templateUrl: 'partials/my-chars.html'
			}).
			when('/planet', {
				templateUrl: 'partials/planets.html',
				controller: 'planetsCtrl'
			}).
			when('/result', {
				templateUrl: 'partials/result.html',
				controller: 'getPersonCtrl'
			}).
			when('/profile', {
				templateUrl: 'partials/profile.html',
				controller: 'profileCtrl'
			}).
			when('/test', {
				templateUrl: 'partials/test.html',
				controller: 'testCtrl'
			}).
			when('/universe', {
				templateUrl: 'partials/universe.html',
				controller: 'planetsCtrl'
			}).

			when('/instructions', {
				templateUrl: 'partials/instructions.html'
			}).
			otherwise({
				redirectTo: '/home'
			});
	}]);



