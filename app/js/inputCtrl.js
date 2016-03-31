StarWarsApp.controller('inputCtrl', function($scope, StarModel){

$scope.inputName=function(query){
	StarModel.addToProfile('name', query)
	}


$scope.submitHairEyeHeight=function(hair, eye, height){
	StarModel.addToProfile('hair', hair)
	StarModel.addToProfile('eye', eye)
	StarModel.addToProfile('height', height)
	}



});