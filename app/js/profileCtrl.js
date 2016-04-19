StarWarsApp.controller('profileCtrl', function($scope, StarModel){

$scope.profil = StarModel.returnProfile();

$scope.lookAlikes = StarModel.returnlookAlikes();

$scope.wonplanets = StarModel.returnWonPlanets();

console.log($scope.wonplanets[0]);

$scope.lostplanets = StarModel.returnLostPlanets();

});