StarWarsApp.controller('startCtrl', function($scope, StarModel, $location){

var planetUrl = "http://swapi.co/api/planets/"
var peopleUrl = "http://swapi.co/api/people/"

// hecking if user has previous api-response in local storage.
// If so, fetching the data from local storage. If not, calling the API and fetching 
// people and planets from API. 
$scope.loading = function(startwars){
	// While waiting we're setting loading-variable to true and hiding play-button

	$scope.loading = true;
	$scope.showPlay = false;

	StarModel.checkLocalStorage()

	// If no planets or people in local storage, we have to get them from API 
	if(StarModel.checkLocalStorage() === false){
	$scope.fetchPlanets();

	// Playing Star Wars-intro while loading to get into the right mode. 
	document.getElementById('audio1').play(startwars);
}else{

// If we have planets and people in local storage, get them! 
	StarModel.getPlanetsFromLocal();
	$scope.loading = false;
	$scope.timeToPlay();
	}
};


// Fetching planets from API by calling fetchAll of planetUrl from model.
// Waiting for respons and then adding planets to list of planets in model 
$scope.fetchPlanets = function(){
	StarModel.fetchAll(planetUrl).then(function(response){
		$scope.planets = response;
	// Planets are done! Save in planet-list in model!  
		StarModel.addPlanets($scope.planets);

	// When planets are done, fetch all people from API.
		$scope.fetchPeople();
	})
};

$scope.fetchPeople = function(){
	StarModel.fetchAll(peopleUrl).then(function(response){
		$scope.people = response;

	// People are done! Save each person to their homeplanet in list of planets model. 
		StarModel.addPeople($scope.people);

	// And save all our API-responses to local storage, to avoid load-time. 
		StarModel.savePlanetsLocalStorage();

	// Now loading is done. Set load-variable to false and it's time to play! 
		$scope.loading = false;
		$scope.timeToPlay();
	})
};


// Animations to remove intro-text, loadingmessage and creating menu

$scope.timeToPlay = function(){
	TweenMax.to("#introplanet", 1, {y:-200, 'delay':1.5});
	TweenMax.to("#introtext", 1, {'opacity':0, 'scale':0, 'delay':1});
	TweenMax.from("#introplay", 1, {'opacity':0, 'delay':2});

	$scope.showPlay = true;
};


$scope.play = function(){	
	$location.path('/play');
}


});

