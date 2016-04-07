StarWarsApp.controller('inputCtrl', function($scope, StarModel){

$scope.currentheight = "100";
$scope.currentfeet = "280";
	
console.log($scope.currentfeet);
console.log($scope.currentheight);

$scope.inputName=function(query){
	if(query==null){
		alert("Please fill in your name!");
		return ;
	}
	else{
	StarModel.addToProfile('name', query)
}
}

$scope.inputHair=function(color, hex){
	StarModel.addToProfile('hair', color)
	$scope.currenthair = hex;
}

$scope.inputEye=function(eye, hex){
	StarModel.addToProfile('eye', eye)
	$scope.currenteye = hex;
}

$scope.inputHeight=function(height){
	StarModel.addToProfile('height', height)
	$scope.currentfeet = String(height+180);
	$scope.currentheight = String(height);
	console.log($scope.currentfeet);
	console.log($scope.currentheight);
}

$scope.profil = StarModel.returnProfile();
   
$scope.eyecols=StarModel.eyecol;
$scope.haircols = StarModel.haircol;

});

