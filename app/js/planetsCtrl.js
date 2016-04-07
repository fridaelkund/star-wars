StarWarsApp.controller('planetsCtrl', function($scope, StarModel){

$scope.findPlanets = function(){
	console.log("start");
	StarModel.getPlanets.get({},function(data){
	$scope.planets=data.results;
	for (x=0; x<$scope.planets.length; x++){
		$scope.whoAmI = StarModel.returnWhoIAm();

		console.log($scope.whoAmI.planet);
		if ($scope.planets[x].name == $scope.whoAmI.planet){
			$scope.matchedPlanet = $scope.planets[x];
			console.log("match", $scope.matchedPlanet);
		}
		else{
		}
	}
	console.log("klart", $scope.planets);
	}, function(data){
		console.log("nope");
	});
	
}

$scope.moveToPlanet = function(){
	$scope.whoAmI = StarModel.returnWhoIAm();
	$scope.result = StarModel.compete($scope.whoAmI.proc);
	if ($scope.result == 1){
		console.log("You won");
	}
	else{
		console.log("Planet won");
		}
}

$scope.showMessage = function(){
	console.log("hej");
}

});

