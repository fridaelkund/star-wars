StarWarsApp.controller('menuCtrl', function($scope, $location, StarModel){

$scope.profil = StarModel.returnProfile();

$scope.path = $location.$$path;

$scope.location=window.location;

console.log($scope.path);


});