StarWarsApp.controller('profileCtrl', function($scope, StarModel){

$scope.profil = StarModel.returnProfile();

$scope.wonplanets = StarModel.returnWonPlanets();
$scope.lostplanets = StarModel.returnLostPlanets();

$scope.amountOfWonPlanets = $scope.wonplanets.length;
$scope.amountOfLostPlanets = $scope.lostplanets.length;
$scope.totalAmountOfPlanets = $scope.amountOfWonPlanets + $scope.amountOfLostPlanets;

});