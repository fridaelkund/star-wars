StarWarsApp.controller('menuCtrl', function($scope, $location, StarModel){

$scope.profil = StarModel.returnProfile();

$scope.path = $location.$$path;

console.log($scope.path)

});