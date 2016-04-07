var StarWarsApp = angular.module('StarWars', ['ngRoute', 'ngResource']);

StarWarsApp.config(['$routeProvider',
	function($routeProvider) { 
		$routeProvider.
			when('/home', {
				templateUrl: 'partials/start-view.html',
				controller: 'getPersonCtrl'
			}).
			when('/name', {
				templateUrl: 'partials/name-view.html',
				controller: 'inputCtrl'
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
			otherwise({
				redirectTo: '/home'
			});
	}]);



