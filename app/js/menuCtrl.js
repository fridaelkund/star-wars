StarWarsApp.controller('menuCtrl', function($scope, StarModel){

$scope.profil = StarModel.returnProfile();
console.log("profil", $scope.profil);

});