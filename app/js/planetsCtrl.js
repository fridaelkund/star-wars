StarWarsApp.controller('planetsCtrl', function($scope, StarModel){

$scope.whoIAm = StarModel.returnWhoIAm();
$scope.profil = StarModel.returnProfile();

//Hämtar alla planeter som finns (OBS! Nej hämtar bara 10 nu)
$scope.findPlanets = function(){
	StarModel.getPlanets.get({},function(data){
	$scope.planets=data.results;

	//Kallar på matchPlanet för att matcha en planet med den planet där den man är mest lik bor
	$scope.matchPlanet($scope.planets);
	}, function(data){
		console.log("nope"); 
	});
}

$scope.$on('$routeChangeStart', function() { 
   StarModel.savePlanets();
 });

//Matchar planeten för den man är mest lik med rätt planet så att rätt planet kan rekommenderas
$scope.matchPlanet = function(planets){
	$scope.whoAmI = StarModel.returnWhoIAm();
	for (x=0; x<planets.length; x++){
		//Hämtar whoAmI för att kunna använda planeten
		//om planetens namn stämmer den planeten man är "mest lik" så är det en match
		if (planets[x].name == $scope.whoAmI.planet){
			$scope.matchedPlanet = planets[x];
		}
		//Annats händer inget
		else{}
	}
}

$scope.whatclass = function(planet){
	for(i in StarModel.returnWonPlanets()){
		if (planet.name == StarModel.returnWonPlanets()[i].name){
			return "wonplanet"
		}
	}	
	for(i in StarModel.returnLostPlanets()){
		if(planet.name == StarModel.returnLostPlanets()[i].name){
			return "lostplanet"
		}
	}
	return "normalplanet"
};


//Funktion som körs när man klickar på en planet och den har den planet man klickar på som input (tror jag)
//Om man vinner så läggs planeten till i listan med planeter man vunnit. 
$scope.moveToPlanet = function(planet){
	$scope.myPlanets = StarModel.returnWonPlanets();
	$scope.whoAmI = StarModel.returnWhoIAm();
	$scope.result = StarModel.compete($scope.whoAmI.proc);

	if ($scope.result == 1){
		StarModel.addWonPlanet(planet);
		console.log("You won");
		$scope.whatclass(planet);
	}
	else{
		StarModel.addLostPlanet(planet);
		$scope.whatclass(planet);
		console.log("Planet won");
	}
}

})

.directive('toggle', function(){
  return {
    restrict: 'A',
    link: function(scope, element, attrs){
      if (attrs.toggle=="popover"){
        $(element).popover({
        	html: true,
        	content: function() {
        		return ('#popoverContent').html();
        	}
        });
      }
    }
  };
})