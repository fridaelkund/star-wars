StarWarsApp.controller('inputCtrl', function($scope, StarModel){


$scope.inputName=function(query){
	if(query==null){
		return ;
	}
	else{
	StarModel.addToProfile('name', query)
}
}

$scope.inputHair=function(color, hex){
	StarModel.addToProfile('hair', color);
	var profile = StarModel.returnProfile();
	$scope.currenthair = StarModel.haircol[color]
}

$scope.inputEye=function(eye, hex){
	StarModel.addToProfile('eye', eye)
	var profile = StarModel.returnProfile();
	$scope.currenteye = profile.eye;
}

$scope.inputHeight=function(height){
	StarModel.addToProfile('height', height);
	console.log(height);

}

$scope.profil = StarModel.returnProfile();
   
$scope.eyecols=StarModel.eyecol;
$scope.haircols = StarModel.haircol;

console.log(StarModel.haircol["blond"])

});

