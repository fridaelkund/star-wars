StarWarsApp.controller('profileCtrl', function($scope, StarModel){

$scope.profil = StarModel.returnProfile();

$scope.looklike = StarModel.returnWhoIAm();

$scope.wonplanets = StarModel.returnWonPlanets();

console.log($scope.wonplanets[0]);

$scope.lostplanets = StarModel.returnLostPlanets();

});