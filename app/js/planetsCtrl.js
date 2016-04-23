StarWarsApp.controller('planetsCtrl', function($scope, StarModel){

$scope.profil = StarModel.returnProfile();

//*** TA BORT, används ej *** 
$scope.message = "% chance to win";


//Fortsättning här imorgon / Josmol
$scope.$on('$routeChangeStart', function() { 
   StarModel.savePlanets();
 });

$scope.getPlanets = function(){
	$scope.ourPlanets = [];
	$scope.wonPlanets = StarModel.returnWonPlanets();
	$scope.lostPlanets = StarModel.returnLostPlanets();
	$scope.habitantsOnPlanets = StarModel.returnHabitantsOnPlanets();

	//För varje planet i stora planetlistan
	for(i in $scope.habitantsOnPlanets){
		//variable är true först
		$scope.add = true;

		//om poäng ej är noll 
		if($scope.habitantsOnPlanets[i].lookAlike.points !== 0){
			//För varje planet i vunna planeter
			console.log("Hela wonPlanets", $scope.wonPlanets);
			for(j in $scope.wonPlanets){
				console.log("wonPlanets-planet",$scope.wonPlanets[j].planet);
				console.log("habitants-planet", $scope.habitantsOnPlanets[i].planet);
				//Om planet från stora planetlistan är lika med planeten vi är på i vunna planeter
				if($scope.habitantsOnPlanets[i].planet.name === $scope.wonPlanets[j].planet.name){
					console.log($scope.habitantsOnPlanets[i].planet.name, "finns i vunna planeter")
					$scope.add = false;
					console.log("add blir", $scope.add);

				}
			}

			//För varje planet i förlorade planeter
			console.log("Hela förloradePlaneter", $scope.lostPlanets);
			for(n in $scope.lostPlanets){
					console.log("forlorad-planet", $scope.lostPlanets[n]);

				//Om planet i stora planetlistan finns i förloradeplaneter	
				if($scope.habitantsOnPlanets[i].planet.name === $scope.lostPlanets[n].planet.name){
					console.log($scope.habitantsOnPlanets[i].planet.name, "finns i förlorade planeter")
					$scope.add = false;
					console.log("add blir", $scope.add);
				}
			}
			//NURÅ
			if($scope.add == true){

				console.log($scope.habitantsOnPlanets[i].planet.name, 'planet som inte finns i någon lista, ska läggas till') 
				$scope.ourPlanets.push($scope.habitantsOnPlanets[i])
				console.log("ourPlanets efter add", $scope.ourPlanets);
			}
			else{
				console.log("scope.add om det ej gick lägga till", $scope.add);
			}
		}
	}
	console.log("this is all planets with habitants", $scope.ourPlanets)
	console.log("ourPlanets", $scope.ourPlanets)
	console.log("alla won", $scope.wonPlanets);
	console.log("alla lost", $scope.lostPlanets);

}


//Funktion som körs när man klickar på en planet och den har den planet man klickar på som input (tror jag)
//Om man vinner så läggs planeten till i listan med planeter man vunnit. 
$scope.moveToPlanet = function(planet){	
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
		StarModel.addWonPlanet(planet);
		$scope.message = "You won!"
		TweenMax.to(('#'+planet.planet.name.split(' ').join('')), 0.1, {x:"+=10", yoyo:true, repeat:-2});
		TweenMax.to(('#'+planet.planet.name.split(' ').join('')), 0.1, {x:"-=10", yoyo:true, repeat:2});
		TweenMax.from(('#'+planet.planet.name.split(' ').join('')), 5, {'-webkit-filter': 'brightness(100%)', delay:0.5});
		TweenMax.to(('#'+planet.planet.name.split(' ').join('')), 5, {'-webkit-filter': 'brightness(200%)', delay:0.5});
		TweenMax.to(('#'+planet.planet.name.split(' ').join(''),'.popover'), 2, {'display':'none'});

		TweenLite.to(('#'+planet.planet.name.split(' ').join('')+'text'), 0.1, {text:{value:"You won!", delimiter:" "}, ease:Linear.easeNone, delay:2})

	} else{

		StarModel.addLostPlanet(planet);
		$scope.message = "You lost!"
		$scope.whatclass(planet);
		TweenMax.to(('#'+planet.planet.name.split(' ').join('')), 0.1, {x:"+=10", yoyo:true, repeat:-2});
		TweenMax.to(('#'+planet.planet.name.split(' ').join('')), 0.1, {x:"-=10", yoyo:true, repeat:2});
		TweenMax.from(('#'+planet.planet.name.split(' ').join('')), 5, {'-webkit-filter': 'brightness(100%)', delay:0.5});
		TweenMax.to(('#'+planet.planet.name.split(' ').join('')), 5, {'-webkit-filter': 'brightness(0%)', opacity:0, delay:0.5});
		TweenLite.to(('#'+planet.planet.name.split(' ').join('')+'text'), 0.1, {text:{value:"You lost!", delimiter:" "}, ease:Linear.easeNone, delay:2})


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