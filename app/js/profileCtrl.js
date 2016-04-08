StarWarsApp.controller('profileCtrl', function($scope, StarModel){

$scope.looklike = StarModel.returnWhoIAm();

$scope.myplanets = StarModel.returnWonPlanets();

console.log("planeter", $scope.myplanets);

});

