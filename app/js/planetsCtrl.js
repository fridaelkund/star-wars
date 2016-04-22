StarWarsApp.controller('planetsCtrl', function($scope, StarModel){

$scope.profil = StarModel.returnProfile();
$scope.message = "% chance to win";

$scope.$on('$routeChangeStart', function() { 
   StarModel.savePlanets();
 });

$scope.getPlanets = function(){
	$scope.ourPlanets = [];
	$scope.habitantsOnPlanets = StarModel.returnHabitantsOnPlanets();
	for(i in $scope.habitantsOnPlanets){
		if($scope.habitantsOnPlanets[i].lookAlike.points !== 0){
			$scope.ourPlanets.push($scope.habitantsOnPlanets[i])
		}
	}
	console.log("this is all planets with habitants", $scope.ourPlanets)
	console.log("ourPlanets", $scope.ourPlanets)
}


//Funktion som körs när man klickar på en planet och den har den planet man klickar på som input (tror jag)
//Om man vinner så läggs planeten till i listan med planeter man vunnit. 
$scope.moveToPlanet = function(planet){	
	$scope.result = StarModel.compete(planet.lookAlike.points)
	
	console.log($scope.result)

	for(i in StarModel.returnWonPlanets()){
		if(planet == StarModel.returnWonPlanets()[i]){
			console.log("You already won! :)")
			return
			}
		}
	for(i in StarModel.returnLostPlanets()){
		if(planet == StarModel.returnLostPlanets()[i]){
			console.log("You already lost! :(")
			return
			}
		}		

	if ($scope.result == 1){
		StarModel.addWonPlanet(planet);
		$scope.message = "You won!"
		TweenMax.to(('#'+planet.planet.name), 0.2, {x:"+=10", yoyo:true, repeat:-2});
		TweenMax.to(('#'+planet.planet.name), 0.2, {x:"-=10", yoyo:true, repeat:2});
		TweenMax.from(('#'+planet.planet.name), 5, {'-webkit-filter': 'brightness(100%)', delay:0.5});
		TweenMax.to(('#'+planet.planet.name), 5, {'-webkit-filter': 'brightness(200%)', delay:0.5});

	} else{

		StarModel.addLostPlanet(planet);
		$scope.message = "You won!"
		$scope.whatclass(planet);
		TweenMax.to(('#'+planet.planet.name), 0.2, {x:"+=10", yoyo:true, repeat:-2});
		TweenMax.to(('#'+planet.planet.name), 0.2, {x:"-=10", yoyo:true, repeat:2});
		TweenMax.from(('#'+planet.planet.name), 5, {'-webkit-filter': 'brightness(100%)', delay:0.5});
		TweenMax.to(('#'+planet.planet.name), 5, {'-webkit-filter': 'brightness(0%)', opacity:0, delay:0.5});
	}
};


$scope.whatclass = function(planet){
	for(i in StarModel.returnWonPlanets()){
		if (planet.planet.name == StarModel.returnWonPlanets()[i].name){
			return "wonplanet"
		}
	}	
	for(i in StarModel.returnLostPlanets()){
		if(planet.planet.name == StarModel.returnLostPlanets()[i].name){
			return "lostplanet"
		}
	}
	return "normalplanet"
};

$scope.returnMessage = function(planet){
	return planet.planet.name();
}

$scope.open_popup = function(planet){
	console.log("PLANET", planet.population);
	$scope.popup_population = planet.population;
	$scope.popup_name = planet.name;
	$scope.popup_terrain = planet.terrain;
	$scope.popup_climate = planet.climate;
	$scope.popup_surfacewater = planet.surface_water;
	$scope.popup_diameter = planet.diameter;
	angular.element('#light').css('display', 'block');
	angular.element('#fade').css('display', 'block');
};

$scope.close_popup = function(){
	angular.element('#light').css('display', 'none');
	angular.element('#fade').css('display', 'none');
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