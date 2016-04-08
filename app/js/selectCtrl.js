StarWarsApp.controller('selectCtrl', function($scope, StarModel){

$scope.allLocals = StarModel.getAllLocals();

$scope.eyecols=StarModel.eyecol;
$scope.haircols = StarModel.haircol;

// Måste lägga in så att den får hex-värden på färger (hämta från haircols[color] för varje gubbe typ) samt fötter. 

});