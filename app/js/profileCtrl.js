StarWarsApp.controller('profileCtrl', function($scope, StarModel){

$scope.profil = StarModel.returnProfile();

$scope.wonplanets = StarModel.returnWonPlanets();
console.log("wonp", $scope.wonplanets);
$scope.lostplanets = StarModel.returnLostPlanets();
console.log("LOSTp", $scope.lostplanets);


$scope.amountOfWonPlanets = $scope.wonplanets.length;
$scope.amountOfLostPlanets = $scope.lostplanets.length;
$scope.totalAmountOfPlanets = $scope.amountOfWonPlanets + $scope.amountOfLostPlanets;

});