StarWarsApp.controller('profileCtrl', function($scope, StarModel){

$scope.profil = StarModel.returnProfile();

$scope.wonplanets = StarModel.returnWonPlanets();

console.log($scope.wonplanets[0]);

$scope.lostplanets = StarModel.returnLostPlanets();

});