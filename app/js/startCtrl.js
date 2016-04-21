StarWarsApp.controller('startCtrl', function($scope, StarModel, $location){

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
		console.log("UTE")
		StarModel.savePlanetsLocalStorage();
	})
};

$scope.loading = function(){
	document.getElementById('audio1').play(startwars);
	var hej = StarModel.checkLocalStorage()
	console.log(hej);
	if(StarModel.checkLocalStorage() === true){
	$scope.fetchPlanets();
}
else{
	StarModel.returnPlanetsFromLocal();
	}
};

$scope.to_play = function(){
	console.log("I to play")
	TweenMax.to("#introplanet", 1, {y:-200, 'delay':0.5});
	TweenMax.to("#introtext", 1, {'opacity':0, 'scale':0});
};

$scope.byt = function(){	
	$location.path('/play');
}


});

