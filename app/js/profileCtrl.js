StarWarsApp.controller('profileCtrl', function($scope, StarModel){

$scope.profil = StarModel.returnProfile();

$scope.wonplanets = StarModel.returnWonPlanets();

$scope.lostplanets = StarModel.returnLostPlanets();



});