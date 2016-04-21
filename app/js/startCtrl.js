StarWarsApp.controller('startCtrl', function($scope, StarModel, $location){

$scope.data = [];
var planetUrl = "http://swapi.co/api/planets/"
var peopleUrl = "http://swapi.co/api/people/"

// Starting on page load. Checking if user has our api-response in local storage.
// If so, fetching the data from local storage. If not, calling the API and fetching 
// people and planets through our model. 
$scope.loading = function(){
	$scope.loading = true;
	StarModel.checkLocalStorage()
	if(StarModel.checkLocalStorage() === true){
	$scope.fetchPlanets();
}
else{
	StarModel.returnPlanetsFromLocal();
	$scope.loading = false;
	}
};


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
		StarModel.savePlanetsLocalStorage();
		$scope.loading = false;
		$scope.to_play();

	})
};

$scope.to_play = function(){
	TweenMax.to("#introplanet", 1, {y:-200, 'delay':0.5});
	TweenMax.to("#introtext", 1, {'opacity':0, 'scale':0});
};

$scope.byt = function(){	
	$location.path('/play');
}


});

