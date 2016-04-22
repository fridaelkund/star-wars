StarWarsApp.controller('profileCtrl', function($scope, StarModel){

$scope.load_profile = function(){

$scope.profil = StarModel.returnProfile();
console.log($scope.profil);

$scope.wonplanets = StarModel.returnWonPlanets();
console.log("wonp", $scope.wonplanets);

$scope.lostplanets = StarModel.returnLostPlanets();
console.log("LOSTp", $scope.lostplanets);

if($scope.wonplanets.length !== 0){
	$scope.amountOfWonPlanets = $scope.wonplanets.length;
	$scope.amountOfLostPlanets = $scope.lostplanets.length;
	$scope.totalAmountOfPlanets = $scope.amountOfWonPlanets + $scope.amountOfLostPlanets;
};

};


});