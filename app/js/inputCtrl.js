StarWarsApp.controller('inputCtrl', function($scope, StarModel){

$scope.inputName=function(query){
	if(query==null){
		alert("Please fill in your name!");
		return ;
	}
	else{
	StarModel.addToProfile('name', query)
}
}


$scope.inputHair=function(hair){
	StarModel.addToProfile('hair', hair)
}

$scope.inputEye=function(eye){
	StarModel.addToProfile('eye', eye)
}

$scope.inputHeight=function(height){
	StarModel.addToProfile('height', height)
}

$scope.profil = StarModel.returnProfile();
   
$scope.eyecols=StarModel.eyecol;
$scope.haircols = StarModel.haircol;

console.log($scope.haircols["blue"]);

});

