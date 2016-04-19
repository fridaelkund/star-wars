StarWarsApp.controller('planetsCtrl', function($scope, StarModel){

$scope.whoIAm = StarModel.returnWhoIAm();
$scope.profil = StarModel.returnProfile();

//Hämtar alla planeter som finns (OBS! Nej hämtar bara 10 nu)
$scope.findPlanets = function(){
	StarModel.getPlanets.get({},function(data){
	$scope.planets=data.results;
	console.log("JA");
	}, function(data){
	console.log("nope"); 
	});
}

$scope.$on('$routeChangeStart', function() { 
   StarModel.savePlanets();
 });


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
	console.log(planet.name);
	$scope.allPlanets = StarModel.returnPlanets();
	console.log("Pö", $scope.allPlanets)
	$scope.whoAmI = StarModel.returnWhoIAm();

	for(a=0; a<$scope.allPlanets.length; a++){
		console.log("p", $scope.whoAmI[a].proc)
		$scope.proc = $scope.whoAmI[a].proc
		if ($scope.allPlanets[a].planetName == planet.name){
			//funkar inte men typ nåt sånt här borde det bli
		$scope.result = StarModel.compete($scope.proc);
		}
		else{
			console.log("nej");
		}
	}

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