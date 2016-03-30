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
			otherwise({
				redirectTo: '/name'
			});
	}]);



