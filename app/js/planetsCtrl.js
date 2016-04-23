StarWarsApp.controller('planetsCtrl', function($scope, StarModel){
// ------------- storing data -----------------

$scope.profil = StarModel.returnProfile();


//saves data to localStorage if we switch to other page
$scope.$on('$routeChangeStart', function() { 
   StarModel.saveLocalStorage();
 });

// ------------- getting data for battle field -----------------

//Planets that are suppose to be shown on the battle field are fetched here and put in an array to use for displaying
$scope.getPlanets = function(){
	$scope.ourPlanets = [];
	$scope.wonPlanets = $scope.profil.wonPlanets;
	$scope.lostPlanets = $scope.profil.lostPlanets;
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


// ------------- game -----------------


//When the user clicks on a planet this is the function that is being run. 
//It calls the model to run the gameand tells if the user won or lost
$scope.fightForPlanet = function(planet){	
	$scope.result = StarModel.compete(planet.lookAlike.points);

	//This makes sure the user can't play again on the planet
	for(i in $scope.wonPlanets){
		if(planet == $scope.wonPlanets[i]){
			console.log("You already won! :)")
			return
			}
		}
	//This makes sure the user can't play again on the planet
	for(i in $scope.lostPlanets){
		if(planet == $scope.lostPlanets[i]){
			console.log("You already lost! :(")
			return
			}
		}		
	$scope.checkIfWinner(planet);
};

//Checks if user wins the planet or not and preforms animations depending on outcome
//If result = 1 the user won the planet, otherwise the user lost it. 
$scope.checkIfWinner = function(planet){
	if ($scope.result == 1){
		StarModel.addToProfile('wonPlanets',planet);
		$scope.message = "You won!"
		TweenMax.to(('#'+planet.planet.name.split(' ').join('')), 0.1, {x:"+=10", yoyo:true, repeat:-3});
		TweenMax.to(('#'+planet.planet.name.split(' ').join('')), 0.1, {x:"-=10", yoyo:true, repeat:3});
		
		TweenLite.to(('#'+planet.planet.name.split(' ').join('')+'status'), 0.001, {text:{value:"You won!", delimiter:" "}, ease:Linear.easeNone, delay:1})

		TweenMax.from(('#'+planet.planet.name.split(' ').join('')), 5, {'-webkit-filter': 'brightness(100%)', delay:2});
		TweenMax.to(('#'+planet.planet.name.split(' ').join('')), 5, {'-webkit-filter': 'brightness(150%)', delay:2});

	} else{
		StarModel.addToProfile('lostPlanets', planet)
		$scope.message = "You lost!";
		$scope.whatclass(planet);
		TweenMax.to(('#'+planet.planet.name.split(' ').join('')), 0.1, {x:"+=10", yoyo:true, repeat:-3});
		TweenMax.to(('#'+planet.planet.name.split(' ').join('')), 0.1, {x:"-=10", yoyo:true, repeat:3});

		TweenLite.to(('#'+planet.planet.name.split(' ').join('')+'status'), 0.001, {text:{value:"You lost!", delimiter:" "}, ease:Linear.easeNone, delay:1})

		TweenMax.from(('#'+planet.planet.name.split(' ').join('')), 5, {'-webkit-filter': 'brightness(100%)', delay:2});
		TweenMax.to(('#'+planet.planet.name.split(' ').join('')), 5, {'-webkit-filter': 'brightness(0%)', opacity:0, delay:2});
		
		TweenMax.to(('#'+planet.planet.name.split(' ').join('')+'text'), 4, {opacity:0, delay:1});
	}


}

//Function that changes the class for the planet-element 
//depending on if it have been won/lost or not played yet
$scope.whatclass = function(planet){
	for(i in $scope.wonPlanets){
		if (planet.planet.name == $scope.wonPlanets[i].name){
			return "wonplanet"
		}
	}	
	for(i in $scope.lostPlanets){
		if(planet.planet.name == $scope.lostPlanets[i].name){
			return "lostplanet"
		}
	}
	return "normalplanet"
};

})

