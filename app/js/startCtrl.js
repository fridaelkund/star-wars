StarWarsApp.controller('startCtrl', function($scope, StarModel){

$scope.data = [];
var planetUrl = "http://swapi.co/api/planets/"
var peopleUrl = "http://swapi.co/api/people/"


$scope.fetchPlanets = function(){
	console.log("I fetch planets")
	StarModel.fetchAll(planetUrl).then(function(response){
		$scope.planets = response;
		StarModel.addPlanets($scope.planets);	
		$scope.fetchPeople();
		return $scope.planets
	})
};

$scope.fetchPeople = function(){
	console.log("I fetch people")
	StarModel.fetchAll(peopleUrl).then(function(response){
		$scope.people = response;
		StarModel.addPeople($scope.people);
		return $scope.people 
	})
};

$scope.loading = function(){
$scope.fetchPlanets();

};

});

