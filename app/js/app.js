var StarWarsApp = angular.module('StarWars', ['ngRoute', 'ngResource']);

StarWarsApp.config([
	function() { 
		$routeProvider.
			when('/home',{
				templateUrl:'partials/start-view.html'
			}).
			otherwise({
				redirectTo:'/home'
			});
	}])
