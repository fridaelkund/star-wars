var StarWarsApp = angular.module('StarWars', ['ngRoute', 'ngResource']);

StarWarsApp.config(['$routeProvider',
	function($routeProvider) { 
		$routeProvider.
			when('/home', {
				templateUrl: 'partials/start-view.html',
				controller: 'getPersonCtrl'
			}).
			when('/hair', {
				templateUrl: 'partials/hair-view.html',
				controller: 'inputCtrl'
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
			when('/select', {
				templateUrl: 'partials/select.html',
				controller: 'selectCtrl'
			}).
			when('/test', {
				templateUrl: 'partials/test.html',
				controller: 'testCtrl'
			}).
			otherwise({
				redirectTo: '/home'
			});
	}]);



