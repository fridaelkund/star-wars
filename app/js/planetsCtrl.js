StarWarsApp.controller('planetsCtrl', function($scope, StarModel){


//Hämtar alla planeter som finns (OBS! Nej hämtar bara 10 nu)
$scope.findPlanets = function(){
	console.log("start");
	StarModel.getPlanets.get({},function(data){
	$scope.planets=data.results;

	//Kallar på matchPlanet för att matcha en planet med den planet där den man är mest lik bor
	$scope.matchPlanet($scope.planets);

	console.log("klart", $scope.planets);
	}, function(data){
		console.log("nope");
	});
	
}

//Matchar planeten för den man är mest lik med rätt planet så att rätt planet kan rekommenderas
$scope.matchPlanet = function(planets){
	for (x=0; x<planets.length; x++){
		//Hämtar whoAmI för att kunna använda planeten
		$scope.whoAmI = StarModel.returnWhoIAm();

		console.log($scope.whoAmI.planet);
		//om planetens namn stämmer den planeten man är "mest lik" så är det en match
		if (planets[x].name == $scope.whoAmI.planet){
			$scope.matchedPlanet = planets[x];
			console.log("match", $scope.matchedPlanet);
		}
		//Annats händer inget
		else{}
	}
}


//Funktion som körs när man klickar på en planet och den har den planet man klickar på som input (tror jag)
//Om man vinner så läggs planeten till i listan med planeter man vunnit. 
$scope.moveToPlanet = function(planet){
	$scope.myPlanets = StarModel.returnWonPlanets();
	$scope.whoAmI = StarModel.returnWhoIAm();
	$scope.result = StarModel.compete($scope.whoAmI.proc);
	if ($scope.result == 1){
		StarModel.addPlanet(planet);
		$scope.changeColor=function(){
			return{
			 "background-color": "green"
			}
			;}
		//Det som ej funkar är att byta färg och visa vad som händer på skärmen, 
		//där kanske strukturen i html-koden behöver tänkas om
		console.log("You won");
	}
	else{
		$scope.changeColor=function(){
		return {
			"background-color": "red"
		}
		;}
		console.log("Planet won");

		//Om planeten vinner kanske alla planeter ska tas bort från "planeter jag vunnit"-listan
		}
}

});

