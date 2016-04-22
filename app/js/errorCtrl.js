StarWarsApp.controller('errorCtrl', function($scope, StarModel){

$scope.profil = StarModel.returnProfile();

$scope.isChar=function(){

	if ($scope.profil.name == ""){
		var isNot = isNot;
		return isNot;
	};
}

});