var StarWarsApp = angular.module('StarWars', ['ngRoute', 'ngResource']);

StarWarsApp.config(['$routeProvider',
	function($routeProvider) { 
		$routeProvider.
			when('/home', {
				templateUrl: 'partials/start.html'
			}).
			when('/new-char', {
				templateUrl: 'partials/new-char.html',
				controller: 'inputCtrl'
			}).
			when('/char-library', {
				templateUrl: 'partials/char-library.html',
				controller: 'inputCtrl'
			}).
			when('/planets', {
				templateUrl: 'partials/planets.html',
				controller: 'planetsCtrl'
			}).
			when('/profile', {
				templateUrl: 'partials/profile.html',
				controller: 'profileCtrl'
			}).
			when('/instructions', {
				templateUrl: 'partials/instructions.html'
			}).
			otherwise({
				redirectTo: '/home'
			});
	}]);



