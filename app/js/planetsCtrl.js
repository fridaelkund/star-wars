StarWarsApp.controller('planetsCtrl', function($scope, StarModel){

$scope.profil = StarModel.returnProfile();

$scope.$on('$routeChangeStart', function() { 
   StarModel.savePlanets();
 });

$scope.time == "nottime"

$scope.getPlanets = function(){
	$scope.ourPlanets = [];

	$scope.habitantsOnPlanets = StarModel.returnHabitantsOnPlanets();
	for(i in $scope.habitantsOnPlanets){
		if($scope.habitantsOnPlanets[i].lookAlike.points !== 0){
			$scope.ourPlanets.push($scope.habitantsOnPlanets[i])
		}
	}
	console.log("this is all planets with habitants", $scope.ourPlanets)
}

//Funktion som körs när man klickar på en planet och den har den planet man klickar på som input (tror jag)
//Om man vinner så läggs planeten till i listan med planeter man vunnit. 
$scope.moveToPlanet = function(planet){
	$scope.result = StarModel.compete(planet.lookAlike.points)
	
	console.log($scope.result)

	for(i in StarModel.returnWonPlanets()){
		if(planet == StarModel.returnWonPlanets()[i].planet){
			console.log("You already won! :)")
			return
			}
		}
	for(i in StarModel.returnLostPlanets()){
		if(planet == StarModel.returnLostPlanets()[i].planet){
			console.log("You already lost! :(")
			return
			}
		}		

	if ($scope.result == 1){
		StarModel.addWonPlanet(planet);
		console.log("You won", planet);
		$scope.whatclass(planet);

	} else{

		StarModel.addLostPlanet(planet);
		console.log("You lost!", planet);
		$scope.whatclass(planet);
	}
};


$scope.whatclass = function(planet){
	for(i in StarModel.returnWonPlanets()){
		if (planet.planet.name == StarModel.returnWonPlanets()[i].planet.planet.name){
			return "wonplanet"
		}
	}	
	for(i in StarModel.returnLostPlanets()){
		if(planet.planet.name == StarModel.returnLostPlanets()[i].planet.planet.name){
			return "lostplanet"
		}
	}
	return "normalplanet"
};



$scope.popup = function(){
	TweenMax.to('#light', 4, {autoAlpha: 1, display:'block'});
};

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