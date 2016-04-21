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
	})
};

$scope.loading = function(){
	
	$scope.fetchPlanets();
};

$scope.play = function(startwars){
	$scope.show="show";
	document.getElementById('audio1').play(startwars);
	TweenMax.from(".test",1, {y:200, x:100});
	TweenMax.from(".menu", 1, {opacity:0});
	TweenMax.to(".test",10, {y:0, x:100});
	TweenMax.to(".menu", 10, {opacity:1});

}

});

