StarWarsApp.controller('profileCtrl', function($scope, StarModel){

// ------------- storing data -----------------

$scope.profil = StarModel.returnProfile();
$scope.wonPlanets = $scope.profil.wonPlanets;
$scope.lostPlanets = $scope.profil.lostPlanets;


// ------------- pop up window -----------------

//Opens pop up window and presents data about the planet being clicked
$scope.open_popup = function(planet){
	$scope.popup_population = planet.planet.population;
	$scope.popup_name = planet.planet.name;
	$scope.popup_terrain = planet.planet.terrain;
	$scope.popup_climate = planet.planet.climate;
	$scope.popup_surfacewater = planet.planet.surface_water;
	$scope.popup_diameter = planet.planet.diameter;
	angular.element('#light').css('display', 'block');
	angular.element('#fade').css('display', 'block');
};

//closes pop up window
$scope.close_popup = function(){
	angular.element('#light').css('display', 'none');
	angular.element('#fade').css('display', 'none');
}

});