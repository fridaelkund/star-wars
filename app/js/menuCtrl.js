StarWarsApp.controller('menuCtrl', function($scope, $timeout, $location, StarModel){

$scope.profil = StarModel.returnProfile();
$scope.path = $location.$$path;
var planetUrl = "http://swapi.co/api/planets/"
var peopleUrl = "http://swapi.co/api/people/"

// checking if user has previous api-response in local storage.
// If so, fetching the data from local storage. If not, calling the API and fetching 
// people and planets from API. 
$scope.loading = function(startwars){	
	// While waiting we're setting loading-variable to true and hiding play-button
	$scope.loading = true;
	// If no planets or people in local storage, we have to get them from API 
	if(StarModel.checkLocalStorage() === false){
		$scope.fetchPlanets();
	
		$timeout(function() {
    		$scope.loadingmessage = 'First time here? Fetching data';	
   	 }, 2000);

		$timeout(function() {
    		$scope.loadingmessage = 'Tankar rymdskepp...';	
   	 }, 3000);

		$timeout(function() {
    		$scope.loadingmessage = 'Kammar wookies...';	
   	 }, 4000);

	// Playing Star Wars-intro while loading to get into the right mode. 
	document.getElementById('audio1').play(startwars);
	}else{

// If we have planets and people in local storage, get them! 
		$scope.habitantsOnPlanets = StarModel.getPlanetsFromLocal();
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
		$scope.timeToPlay();
	})
};

var t1 = new TimelineMax({delay:2, onComplete:$scope.animateMenu})
t1.to("#introtext", 1, {'opacity':0, 'scale':0});
t1.to("#introplanet", 1, {y:-200}, "-=0.25");
t1.to('#audio1', 2, {'volume':0});

// Animations to remove intro-text, loadingmessage and creating menu
$scope.timeToPlay = function(){
	t1.play();
	$scope.menu = true;
	$scope.loading = false;

	$timeout(function() {
    	$location.path('/instructions');	
   }, 5900);
};

var t2 = new TimelineMax();
	t2.from('#leftMenu', 0.8, {'x':'-100%', 'delay':3});
	t2.from('#rightMenu', 0.8, {'x':'100%', 'delay':3});

$scope.animateMenu = function(){
	if($scope.path == '/home'){
	t2.play();
	}
};


});