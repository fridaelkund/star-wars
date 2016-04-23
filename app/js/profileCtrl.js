StarWarsApp.controller('profileCtrl', function($scope, StarModel){

$scope.load_profile = function(){

//Array with 
$scope.profil = StarModel.returnProfile();
console.log("i profile", $scope.profil)
//Array with won planets ( OBS! endast köra profile.wonPlanets och ej returna endast wonPlanets sen)
$scope.wonplanets = StarModel.returnWonPlanets();

//Array with lost planets 
//NOT USED
$scope.lostplanets = StarModel.returnLostPlanets();

//If there are planets won this part finds out how many they are
//NOT USED 
if($scope.wonplanets.length !== 0){
	$scope.amountOfWonPlanets = $scope.wonplanets.length;
	$scope.amountOfLostPlanets = $scope.lostplanets.length;
	$scope.totalAmountOfPlanets = $scope.amountOfWonPlanets + $scope.amountOfLostPlanets;
};

};


$scope.open_popup = function(planet){
	console.log("PLANET", planet.planet.population);
	$scope.popup_population = planet.planet.population;
	$scope.popup_name = planet.planet.name;
	$scope.popup_terrain = planet.planet.terrain;
	$scope.popup_climate = planet.planet.climate;
	$scope.popup_surfacewater = planet.planet.surface_water;
	$scope.popup_diameter = planet.planet.diameter;
	angular.element('#light').css('display', 'block');
	angular.element('#fade').css('display', 'block');
};

$scope.close_popup = function(){
	angular.element('#light').css('display', 'none');
	angular.element('#fade').css('display', 'none');
}

});