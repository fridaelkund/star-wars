StarWarsApp.controller('planetsCtrl', function($scope, StarModel){

$scope.profile = StarModel.returnProfile();


$scope.$on('$routeChangeStart', function() { 
   StarModel.savePlanets();
 });

//Planets that are suppose to be shown on the battle field are fetched here and put in an array to use for displaying
$scope.getPlanets = function(){
	$scope.ourPlanets = [];
	$scope.wonPlanets = StarModel.returnWonPlanets();
	$scope.lostPlanets = StarModel.returnLostPlanets();
	$scope.habitantsOnPlanets = StarModel.returnHabitantsOnPlanets();

	//For each planet in habitantsOnPlanets
	for(i in $scope.habitantsOnPlanets){
		//Defaultvalue for adding is set to true
		$scope.add = true;

		//If the lookAlike-points for the planet not equeal to 0 
		//we want to proceed (there is a chance to win that planet)
		if($scope.habitantsOnPlanets[i].lookAlike.points !== 0){

			//First we check that the planet doesn't exist among the won planets
			for(j in $scope.wonPlanets){
				console.log("the won planet we're at",$scope.wonPlanets[j].planet);
				console.log("the habitants planet we're at", $scope.habitantsOnPlanets[i].planet);
				
				//If the planet in habitantsOnPlanets and the planet in wonPlanets match we don't want to proceed
				//the $scope.add variable os set to false, we don't want to add it among the planets for the game since it's already won
				if($scope.habitantsOnPlanets[i].planet.name === $scope.wonPlanets[j].planet.name){
					console.log($scope.habitantsOnPlanets[i].planet.name, "exists among won planets")
					$scope.add = false;
					console.log("add-variable is", $scope.add);
				}
			}

			//Then we check that the planet doesn't exist among the lost planets
			for(n in $scope.lostPlanets){
					console.log("the lost planet we're at", $scope.lostPlanets[n]);
					console.log("the habitants planet we're at", $scope.habitantsOnPlanets[i].planet);

				//If the planet in habitantsOnPlanets and the planet in lostPlanets match we don't want to proceed
				//the $scope.add variable os set to false, we don't want to add it among the planets for the game since it's already won
				if($scope.habitantsOnPlanets[i].planet.name === $scope.lostPlanets[n].planet.name){
					console.log($scope.habitantsOnPlanets[i].planet.name, "exists among lost planets");
					$scope.add = false;
					console.log("add-variable is", $scope.add);
				}
			}
			//Finally we check if the add-variable is true. If it is it means we should add it to ourPlanets
			if($scope.add == true){
				console.log('the planet that we add is', $scope.habitantsOnPlanets[i].planet.name); 
				$scope.ourPlanets.push($scope.habitantsOnPlanets[i])
			}
		}
	}
	console.log("These are the planets to be displayed in the game", $scope.ourPlanets);
}


//When the user clicks on a planet this is the function that is being run. 
//It calls the model to run the gameand tells if the user won or lost
$scope.fightForPlanet = function(planet){	
	$scope.result = StarModel.compete(planet.lookAlike.points)
	 $("#popoverContent").popover('hide');

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
		StarModel.addToProfile('wonPlanets',planet);
		//StarModel.addPlanetToProfile(planet, 'won');
		$scope.message = "You won!"
		TweenMax.to(('#'+planet.planet.name.split(' ').join('')), 0.1, {x:"+=10", yoyo:true, repeat:-3});
		TweenMax.to(('#'+planet.planet.name.split(' ').join('')), 0.1, {x:"-=10", yoyo:true, repeat:3});
		
		TweenLite.to(('#'+planet.planet.name.split(' ').join('')+'status'), 0.001, {text:{value:"You won!", delimiter:" "}, ease:Linear.easeNone, delay:1})

		TweenMax.from(('#'+planet.planet.name.split(' ').join('')), 5, {'-webkit-filter': 'brightness(100%)', delay:2});
		TweenMax.to(('#'+planet.planet.name.split(' ').join('')), 5, {'-webkit-filter': 'brightness(150%)', delay:2});

	} else{
		StarModel.addToProfile('lostPlanets', planet)
		StarModel.addPlanetToProfile(planet, 'lost');
		$scope.message = "You lost!"
		$scope.whatclass(planet);
		TweenMax.to(('#'+planet.planet.name.split(' ').join('')), 0.1, {x:"+=10", yoyo:true, repeat:-3});
		TweenMax.to(('#'+planet.planet.name.split(' ').join('')), 0.1, {x:"-=10", yoyo:true, repeat:3});

		TweenLite.to(('#'+planet.planet.name.split(' ').join('')+'status'), 0.001, {text:{value:"You lost!", delimiter:" "}, ease:Linear.easeNone, delay:1})

		TweenMax.from(('#'+planet.planet.name.split(' ').join('')), 5, {'-webkit-filter': 'brightness(100%)', delay:2});
		TweenMax.to(('#'+planet.planet.name.split(' ').join('')), 5, {'-webkit-filter': 'brightness(0%)', opacity:0, delay:2});
		
		TweenMax.to(('#'+planet.planet.name.split(' ').join('')+'text'), 4, {opacity:0, delay:1});
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

